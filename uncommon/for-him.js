const products = {
  denim: {
    name: 'Unisex Vintage Denim Tee \u2013 Embroidered Logo, Oversized Relaxed Fit & Casual American Streetwear Style',
    price: 55,
    sizes: ['M', 'L', 'XL', '2XL'],
    images: [
      { src: 'assets/products/vintage-denim-tee-02.jpeg', alt: 'Vintage denim tee embroidered front' },
      { src: 'assets/products/vintage-denim-tee-01.jpeg', alt: 'Vintage denim tee front and back' },
      { src: 'assets/products/vintage-denim-tee-03.jpeg', alt: 'Close-up of the denim tee sleeve detail' },
      { src: 'assets/products/vintage-denim-tee-04.jpeg', alt: 'Close-up of the denim tee collar' },
      { src: 'assets/products/vintage-denim-size-guide.svg', alt: 'English size chart with garment measurements in centimeters' }
    ]
  },
  graffiti: {
    name: 'Vintage American Graffiti Tee \u2013 Unisex Oversized Fit, Heavyweight Pure Cotton & Retro High-Street Design',
    price: 45,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    images: [
      { src: 'assets/products/graffiti-tee-02.jpeg', alt: 'Cream vintage graffiti tee front' },
      { src: 'assets/products/graffiti-tee-01.jpeg', alt: 'Cream vintage graffiti tee back with red heart graphic' },
      { src: 'assets/products/graffiti-tee-size-guide.svg', alt: 'English graffiti tee size chart in centimeters with recommended weight' }
    ]
  },
  minimalist: {
    name: 'Heavyweight Cotton Tee \u2013 Relaxed Oversized Fit, Premium Fabric & Minimalist American Streetwear Design',
    price: 37,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      { src: 'assets/products/minimalist-tee-01.jpeg', alt: 'Cream heavyweight cotton tee with minimalist graphic' },
      { src: 'assets/products/minimalist-tee-02.jpeg', alt: 'Back of cream heavyweight cotton tee' },
      { src: 'assets/products/minimalist-tee-size-guide.svg', alt: 'English cotton tee size chart with measurements in centimeters' }
    ]
  },
  pixelApple: {
    name: 'Unisex Blue Pixel Apple Graphic Tee \u2013 Vintage-Inspired Print, Oversized Loose Fit & 100% Cotton Summer Streetwear T-Shirt',
    price: 35,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      { src: 'assets/products/pixel-apple-tee-01.jpeg', alt: 'White tee with blue pixel apple graphic' },
      { src: 'assets/products/pixel-apple-size-guide.svg', alt: 'English Blue Pixel Apple tee size chart' }
    ]
  },
  blueGraffiti: {
    name: 'Blue Graffiti Stripe Shirt \u2013 Retro Hong Kong Style, Oversized Fit & Casual Long Sleeve Streetwear',
    price: 37,
    sizes: ['S', 'M', 'L'],
    images: [
      { src: 'assets/products/blue-graffiti-shirt-01.jpeg', alt: 'Blue graffiti stripe long sleeve shirt' },
      { src: 'assets/products/blue-graffiti-shirt-size-guide.svg', alt: 'English height and weight size guide for Blue Graffiti Stripe Shirt' }
    ]
  },
  devilHoodie: {
    name: 'Y2K Devil Hoodie \u2013 Vintage Graphic Patchwork, Heavyweight Fabric & Oversized Zip-Up Streetwear Jacket',
    price: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { src: 'assets/products/y2k-devil-hoodie-01.jpeg', alt: 'Front of gray Y2K Devil graphic zip-up hoodie' },
      { src: 'assets/products/y2k-devil-hoodie-02.jpeg', alt: 'Back of gray Y2K Devil graphic zip-up hoodie' },
      { src: 'assets/products/y2k-devil-hoodie-size-guide.svg', alt: 'English hoodie size chart in centimeters and inches' }
    ]
  },
  vintageCatCardigan: {
    name: 'Vintage Cat Cardigan \u2013 Retro Graphic Design, Relaxed Oversized Fit & Cozy Knit Streetwear Outerwear',
    price: 60,
    sizes: ['M', 'L', 'XL'],
    images: [
      { src: 'assets/products/vintage-cat-cardigan-01.jpeg', alt: 'Gray zip cardigan with vintage cat graphics, product view' },
      { src: 'assets/products/vintage-cat-cardigan-02.jpeg', alt: 'Model wearing the gray vintage cat cardigan' },
      { src: 'assets/products/vintage-cat-cardigan-size-guide.svg', alt: 'English Vintage Cat Cardigan height and weight size guide' }
    ]
  },
  essentialTee: {
    name: 'Essential Tee – 2026 Collection, Relaxed Oversized Fit & Modern Minimalist Streetwear T-Shirt',
    price: 53,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { src: 'assets/products/essential-tee-white-01.jpeg', alt: 'Black Essential Tee with pink heart graphic, product view' },
      { src: 'assets/products/essential-tee-white-02.jpeg', alt: 'Model wearing the black Essential Tee, front view' },
      { src: 'assets/products/essential-tee-white-03.jpeg', alt: 'Model wearing the black Essential Tee, back view' },
      { src: 'assets/products/essential-tee-size-guide.svg', alt: 'English Essential Tee size guide by height and weight' }
    ]
  },
  crossKnitSweater: {
    name: 'Cross Knit Sweater – Vintage Distressed Design, Oversized Fit & Premium Autumn/Winter Streetwear',
    price: 60,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { src: 'assets/products/cross-knit-sweater-01.jpeg', alt: 'Olive cross-knit sweater with distressed details, front view' },
      { src: 'assets/products/cross-knit-sweater-02.jpeg', alt: 'Olive cross-knit sweater, front and back product view' },
      { src: 'assets/products/cross-knit-sweater-size-guide.svg', alt: 'English Cross Knit Sweater size guide with approximate weight recommendations in kilograms' }
    ]
  },
  essentialZipCardigan: {
    name: 'Essential Zip-Up Cardigan – Minimalist Design, Relaxed Fit & Modern Streetwear Knitwear',
    price: 60,
    sizes: ['M', 'L', 'XL'],
    images: [
      { src: 'assets/products/essential-zip-cardigan-01.jpeg', alt: 'Pink Essential Zip-Up Cardigan, back view' },
      { src: 'assets/products/essential-zip-cardigan-02.jpeg', alt: 'Model wearing the pink Essential Zip-Up Cardigan, back view' },
      { src: 'assets/products/essential-zip-cardigan-03.jpeg', alt: 'Model wearing the pink Essential Zip-Up Cardigan, front view' },
      { src: 'assets/products/essential-zip-cardigan-size-guide.svg', alt: 'English Essential Zip-Up Cardigan size guide by height and approximate weight' }
    ]
  },
  rabbitTee: {
    name: 'Rabbit Graphic Tee – 300GSM Heavyweight Pure Cotton, Oversized Fit & Premium Streetwear Style',
    price: 35,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      { src: 'assets/products/rabbit-tee-01.jpeg', alt: 'Black 300 GSM Rabbit Graphic Tee, front view' },
      { src: 'assets/products/rabbit-tee-02.jpeg', alt: 'Black Rabbit Graphic Tee, back view' },
      { src: 'assets/products/rabbit-tee-size-guide.svg', alt: 'English Rabbit Graphic Tee garment size chart in centimeters' }
    ]
  },
  retroStripedPolo: {
    name: 'Retro Striped Polo – Vintage Letter Badge Design, Oversized Relaxed Fit & Modern American Streetwear Style',
    price: 42,
    sizes: ['M', 'L', 'XL', '2XL'],
    images: [
      { src: 'assets/products/retro-striped-polo-01.jpeg', alt: 'White retro striped polo jersey with letter badge and red lettering' },
      { src: 'assets/products/retro-striped-polo-size-guide.svg', alt: 'English Retro Striped Polo height and weight size guide' }
    ]
  },
  dogGraphicSweatshirt: {
    name: 'Dog Graphic Sweatshirt – Vintage American Style, Color-Block Patchwork & Oversized V-Neck Streetwear Top',
    price: 39,
    sizes: ['M', 'L', 'XL'],
    images: [
      { src: 'assets/products/dog-graphic-sweatshirt-01.jpeg', alt: 'White V-neck dog graphic sweatshirt, front view' },
      { src: 'assets/products/dog-graphic-sweatshirt-02.jpeg', alt: 'Dog graphic sweatshirt, front and back views' },
      { src: 'assets/products/dog-graphic-sweatshirt-size-guide.svg', alt: 'English dog graphic sweatshirt height and weight size guide' }
    ]
  },
  cosmicArtTee: {
    name: 'Cosmic Art Tee – Artistic Sun & Moon Graphic, Nature-Inspired Print & Modern Chinese Streetwear Style',
    price: 40,
    sizes: ['L', 'XL'],
    images: [
      { src: 'assets/products/cosmic-art-tee-01.jpeg', alt: 'Light blue Cosmic Art Tee with white sun, moon and nature graphic, front view' },
      { src: 'assets/products/cosmic-art-tee-02.jpeg', alt: 'Light blue Cosmic Art Tee, back view' },
      { src: 'assets/products/cosmic-art-tee-size-guide.svg', alt: 'English Cosmic Art Tee height and weight size guide' }
    ]
  }
};

const toast = document.querySelector('.toast');
let toastTimer;
let activeProductKey = null;
let activeImageIndex = 0;

function readGuestCart() {
  try {
    const value = JSON.parse(localStorage.getItem('uncommon:cart:guest') || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

function refreshBagCount() {
  document.querySelector('.bag-count').textContent = readGuestCart().length;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addProduct(productKey, size) {
  const product = products[productKey];
  const items = readGuestCart();
  items.push({ name: product.name, price: product.price, image: product.images[0].src, size, currency: 'RM', shippingIncluded: true });
  try {
    localStorage.setItem('uncommon:cart:guest', JSON.stringify(items));
    refreshBagCount();
    showToast(`${product.name} added to your bag`);
  } catch {
    showToast('Your bag could not be saved in this browser.');
  }
}

function showImage(dialog, index) {
  const product = products[activeProductKey];
  activeImageIndex = (index + product.images.length) % product.images.length;
  const image = product.images[activeImageIndex];
  dialog.querySelector('.gallery-main-image').src = image.src;
  dialog.querySelector('.gallery-main-image').alt = image.alt;
  dialog.querySelector('.gallery-index').textContent = `${activeImageIndex + 1} / ${product.images.length}`;
  dialog.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === activeImageIndex);
    thumb.setAttribute('aria-pressed', String(i === activeImageIndex));
  });
}

function openGallery(productKey) {
  const product = products[productKey];
  const dialog = document.querySelector(`[data-product-dialog="${productKey}"]`);
  if (!product || !dialog) {
    console.error('Quick View could not find product or gallery:', productKey);
    showToast('This product gallery is temporarily unavailable. Please refresh the page.');
    return;
  }
  activeProductKey = productKey;
  activeImageIndex = 0;
  const sizeSelect = dialog.querySelector('.gallery-size-select');
  dialog.querySelector('h2').textContent = product.name;
  dialog.querySelector('.gallery-price').textContent = `RM${product.price} ? Shipping included`;
  sizeSelect.innerHTML = '<option value="" selected disabled>Select a size</option>' + product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');
  dialog.querySelector('.gallery-add').disabled = true;
  const thumbs = dialog.querySelector('.gallery-thumbnails');
  thumbs.innerHTML = product.images.map((image, index) => `<button class="gallery-thumb" type="button" aria-label="Show photo ${index + 1}" aria-pressed="false"><img src="${image.src}" alt=""></button>`).join('');
  thumbs.querySelectorAll('.gallery-thumb').forEach((button, index) => button.addEventListener('click', () => showImage(dialog, index)));
  showImage(dialog, 0);
  dialog.showModal();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-quickview]');
  if (!button) return;
  event.preventDefault();
  openGallery(button.dataset.productQuickview);
});
document.querySelectorAll('.product-card').forEach(card => {
  const sizeSelect = card.querySelector('.product-size-select');
  const addButton = card.querySelector('[data-product-add]');
  const productKey = addButton.dataset.productAdd;
  sizeSelect.addEventListener('change', () => { addButton.disabled = !sizeSelect.value; });
  addButton.addEventListener('click', () => {
    if (!sizeSelect.value) return;
    addProduct(productKey, sizeSelect.value);
  });
});
document.querySelectorAll('[data-product-dialog]').forEach(dialog => {
  dialog.querySelector('.product-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.querySelector('.gallery-prev').addEventListener('click', () => showImage(dialog, activeImageIndex - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => showImage(dialog, activeImageIndex + 1));
  const sizeSelect = dialog.querySelector('.gallery-size-select');
  const addButton = dialog.querySelector('.gallery-add');
  sizeSelect.addEventListener('change', () => { addButton.disabled = !sizeSelect.value; });
  addButton.addEventListener('click', () => {
    if (!sizeSelect.value) return;
    addProduct(dialog.dataset.productDialog, sizeSelect.value);
    dialog.close();
  });
});

refreshBagCount();
