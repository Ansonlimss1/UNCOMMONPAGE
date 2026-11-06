const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

initializeApp();
const db = getFirestore();
const REGION = 'asia-southeast1';

const products = [
  { name: 'Hollow-Knit Hooded Cardigan for Men and Women, Loose-Fit Korean-Style Solid-Color Casual Sun-Protective Sweater', price: 45, sizes: ['M', 'L', 'XL'], image: 'assets/products/hollow-knit-01.jpeg' },
  { name: 'Unisex Oversized Autumn Tee – Minimalist Loose-Fit Short Sleeve Streetwear Top', price: 35, sizes: ['M', 'L', 'XL', '2XL', '3XL'], image: 'assets/products/off-script-01.jpeg' },
  { name: 'Black Curved Wide-Leg Pants – Relaxed Fit, Draped Silhouette & Modern Minimalist Streetwear Trousers', price: 32, sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], image: 'assets/products/wide-leg-01.jpeg' },
  { name: 'Black Dropout Bear Backpack – Premium PU Leather Cartoon Design, Spacious Everyday Streetwear Bag', price: 38, sizes: [], image: 'assets/products/dropout-bear-01.jpeg' },
  { name: 'Unisex Vintage Denim Tee – Embroidered Logo, Oversized Relaxed Fit & Casual American Streetwear Style', price: 55, sizes: ['M', 'L', 'XL', '2XL'], image: 'assets/products/vintage-denim-tee-02.jpeg' },
  { name: 'Vintage American Graffiti Tee – Unisex Oversized Fit, Heavyweight Pure Cotton & Retro High-Street Design', price: 45, sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'], image: 'assets/products/graffiti-tee-02.jpeg' },
  { name: 'Heavyweight Cotton Tee – Relaxed Oversized Fit, Premium Fabric & Minimalist American Streetwear Design', price: 37, sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], image: 'assets/products/minimalist-tee-01.jpeg' },
  { name: 'Unisex Blue Pixel Apple Graphic Tee – Vintage-Inspired Print, Oversized Loose Fit & 100% Cotton Summer Streetwear T-Shirt', price: 35, sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], image: 'assets/products/pixel-apple-tee-01.jpeg' },
  { name: 'Blue Graffiti Stripe Shirt – Retro Hong Kong Style, Oversized Fit & Casual Long Sleeve Streetwear', price: 37, sizes: ['S', 'M', 'L'], image: 'assets/products/blue-graffiti-shirt-01.jpeg' },
  { name: 'Y2K Devil Hoodie – Vintage Graphic Patchwork, Heavyweight Fabric & Oversized Zip-Up Streetwear Jacket', price: 50, sizes: ['S', 'M', 'L', 'XL'], image: 'assets/products/y2k-devil-hoodie-01.jpeg' },
  { name: 'Vintage Cat Cardigan – Retro Graphic Design, Relaxed Oversized Fit & Cozy Knit Streetwear Outerwear', price: 60, sizes: ['M', 'L', 'XL'], image: 'assets/products/vintage-cat-cardigan-01.jpeg' },
  { name: 'Essential Tee – 2026 Collection, Relaxed Oversized Fit & Modern Minimalist Streetwear T-Shirt', price: 53, sizes: ['S', 'M', 'L', 'XL'], image: 'assets/products/essential-tee-white-01.jpeg' },
  { name: 'Cross Knit Sweater – Vintage Distressed Design, Oversized Fit & Premium Autumn/Winter Streetwear', price: 60, sizes: ['S', 'M', 'L', 'XL'], image: 'assets/products/cross-knit-sweater-01.jpeg' },
  { name: 'Essential Zip-Up Cardigan – Minimalist Design, Relaxed Fit & Modern Streetwear Knitwear', price: 60, sizes: ['M', 'L', 'XL'], image: 'assets/products/essential-zip-cardigan-01.jpeg' },
  { name: 'Rabbit Graphic Tee – 300GSM Heavyweight Pure Cotton, Oversized Fit & Premium Streetwear Style', price: 35, sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], image: 'assets/products/rabbit-tee-01.jpeg' },
  { name: 'Retro Striped Polo – Vintage Letter Badge Design, Oversized Relaxed Fit & Modern American Streetwear Style', price: 42, sizes: ['M', 'L', 'XL', '2XL'], image: 'assets/products/retro-striped-polo-01.jpeg' },
  { name: 'Dog Graphic Sweatshirt – Vintage American Style, Color-Block Patchwork & Oversized V-Neck Streetwear Top', price: 39, sizes: ['M', 'L', 'XL'], image: 'assets/products/dog-graphic-sweatshirt-01.jpeg' },
  { name: 'Cosmic Art Tee – Artistic Sun & Moon Graphic, Nature-Inspired Print & Modern Chinese Streetwear Style', price: 40, sizes: ['L', 'XL'], image: 'assets/products/cosmic-art-tee-01.jpeg' }
];

function normalizeName(value) {
  return String(value || '').replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function requiredText(value, label, maxLength) {
  if (typeof value !== 'string') throw new HttpsError('invalid-argument', `${label} is required.`);
  const clean = value.trim();
  if (!clean || clean.length > maxLength) throw new HttpsError('invalid-argument', `Enter a valid ${label.toLowerCase()}.`);
  return clean;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

exports.placeOrder = onCall({ region: REGION }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in before placing an order.');
  const data = request.data || {};
  const method = data.paymentMethod;
  if (!['tng', 'duitnow'].includes(method)) throw new HttpsError('invalid-argument', 'Select a supported payment method.');
  if (data.confirmedPaid !== true) throw new HttpsError('failed-precondition', 'Confirm that you have completed the QR payment.');

  const address = data.shippingAddress || {};
  const shippingAddress = {
    name: requiredText(address.name, 'Recipient name', 100),
    phone: requiredText(address.phone, 'Phone number', 30),
    street: requiredText(address.street, 'Street address', 180),
    city: requiredText(address.city, 'City', 100),
    state: requiredText(address.state, 'State or territory', 100),
    postcode: requiredText(address.postcode, 'Postcode', 5),
    country: 'Malaysia'
  };
  if (!/^\d{5}$/.test(shippingAddress.postcode)) throw new HttpsError('invalid-argument', 'Enter a 5-digit Malaysian postcode.');
  if (!/^[+0-9()\-\s]{8,30}$/.test(shippingAddress.phone)) throw new HttpsError('invalid-argument', 'Enter a valid phone number.');

  if (!Array.isArray(data.items) || data.items.length < 1 || data.items.length > 50) {
    throw new HttpsError('invalid-argument', 'Your bag is empty or has too many items.');
  }
  const catalogByName = new Map(products.map((product) => [normalizeName(product.name), product]));
  const items = data.items.map((requested) => {
    const product = catalogByName.get(normalizeName(requested?.name));
    if (!product) throw new HttpsError('invalid-argument', 'An item in your bag is no longer available.');
    const size = String(requested?.size || '').trim();
    if (product.sizes.length && !product.sizes.includes(size)) throw new HttpsError('invalid-argument', `Choose a valid size for ${product.name}.`);
    return { name: product.name, size, price: product.price, currency: 'RM', image: product.image, shippingIncluded: true };
  });
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const paymentMethod = method === 'tng' ? 'Touch ‘n Go eWallet' : 'DuitNow bank transfer';
  const order = {
    userId: request.auth.uid,
    customerEmail: request.auth.token.email || '',
    customerName: request.auth.token.name || '',
    items,
    total,
    currency: 'RM',
    paymentMethod,
    paymentStatus: 'awaiting-verification',
    shippingStatus: 'Order received',
    shippingAddress,
    createdAt: FieldValue.serverTimestamp(),
  };

  let orderRef;
  try {
    orderRef = await db.collection('orders').add(order);
  } catch (error) {
    console.error('Could not save order in Firestore:', error);
    throw new HttpsError('failed-precondition', 'The order database is not ready. Create the Cloud Firestore database and deploy the Firestore rules, then try again.');
  }
  return { orderId: orderRef.id, paymentStatus: order.paymentStatus, shippingStatus: order.shippingStatus };
});
