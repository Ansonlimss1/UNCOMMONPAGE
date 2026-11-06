
const count = document.querySelector('.bag-count');
const toast = document.querySelector('.toast');
let bagCount = 0;
let toastTimer;
const cart = [];

const cardigan = {
  name: 'Hollow-Knit Hooded Cardigan for Men and Women, Loose-Fit Korean-Style Solid-Color Casual Sun-Protective Sweater',
  price: 45,
  currency: 'RM',
  sizes: ['M', 'L', 'XL'],
  images: [
    { src: 'assets/products/hollow-knit-01.jpeg', alt: 'Cream hollow-knit cardigan, front view' },
    { src: 'assets/products/hollow-knit-02.jpeg', alt: 'Cream hollow-knit cardigan, side view' },
    { src: 'assets/products/hollow-knit-03.jpeg', alt: 'Cream hollow-knit cardigan, back view' },
    { src: 'assets/products/hollow-knit-04.jpeg', alt: 'Cream hollow-knit cardigan, seated look' },
    { src: 'assets/products/hollow-knit-size-guide.svg', alt: 'English cardigan size guide by height and weight, with weight converted to kilograms' }
  ]
};
const offScriptTee = {
  name: 'Unisex Oversized Autumn Tee – Minimalist Loose-Fit Short Sleeve Streetwear Top',
  price: 35,
  currency: 'RM',
  sizes: ['M', 'L', 'XL', '2XL', '3XL'],
  description: 'A relaxed, oversized black cotton tee with a minimal chest mark.',
  images: [
    { src: 'assets/products/off-script-01.jpeg', alt: 'Black Off Script Tee, front styling view' },
    { src: 'assets/products/off-script-02.jpeg', alt: 'Black Off Script Tee with headphones' },
    { src: 'assets/products/off-script-03.jpeg', alt: 'Black Off Script Tee, full styling view' },
    { src: 'assets/products/off-script-04.jpeg', alt: 'Black Off Script Tee, product-only view' },
    { src: 'assets/products/off-script-size-guide.svg', alt: 'English Off Script Tee weight size chart with kilogram and jin ranges for M through 3XL' }
  ]
};
const wideLegPants = {
  name: 'Black Curved Wide-Leg Pants – Relaxed Fit, Draped Silhouette & Modern Minimalist Streetwear Trousers',
  price: 32,
  currency: 'RM',
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  description: 'Relaxed black wide-leg trousers with a fluid drape and a modern minimalist silhouette. Shipping included.',
  images: [
    { src: 'assets/products/wide-leg-01.jpeg', alt: 'Black curved wide-leg pants, front view' },
    { src: 'assets/products/wide-leg-02.jpeg', alt: 'Black curved wide-leg pants, alternate front view' },
    { src: 'assets/products/wide-leg-03.jpeg', alt: 'Black curved wide-leg pants, back view' },
    { src: 'assets/products/wide-leg-size-guide.svg', alt: 'English size chart for black curved wide-leg pants' }
  ]
};
const dropoutBearBackpack = {
  name: 'Black Dropout Bear Backpack – Premium PU Leather Cartoon Design, Spacious Everyday Streetwear Bag',
  price: 38,
  currency: 'RM',
  sizes: ['One size'],
  description: 'A spacious black PU leather backpack with a playful bear face and colorful details. Shipping included.',
  images: [
    { src: 'assets/products/dropout-bear-01.jpeg', alt: 'Black bear backpack worn from behind' },
    { src: 'assets/products/dropout-bear-02.jpeg', alt: 'Black bear backpack styled on the street' },
    { src: 'assets/products/dropout-bear-03.jpeg', alt: 'Black bear backpack shown from the front' },
    { src: 'assets/products/dropout-bear-04.jpeg', alt: 'Black bear backpack in a streetwear outfit' }
  ]
};
const vintageDenimTee = {
  name: 'Unisex Vintage Denim Tee \u2013 Embroidered Logo, Oversized Relaxed Fit & Casual American Streetwear Style',
  price: 55,
  currency: 'RM',
  sizes: ['M', 'L', 'XL', '2XL'],
  images: [{ src: 'assets/products/vintage-denim-tee-02.jpeg', alt: 'Vintage denim tee' }]
};
const vintageGraffitiTee = {
  name: 'Vintage American Graffiti Tee \u2013 Unisex Oversized Fit, Heavyweight Pure Cotton & Retro High-Street Design',
  price: 45,
  currency: 'RM',
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
};
const heavyweightCottonTee = {
  name: 'Heavyweight Cotton Tee \u2013 Relaxed Oversized Fit, Premium Fabric & Minimalist American Streetwear Design',
  price: 37,
  currency: 'RM',
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
};
const pixelAppleTee = {
  name: 'Unisex Blue Pixel Apple Graphic Tee \u2013 Vintage-Inspired Print, Oversized Loose Fit & 100% Cotton Summer Streetwear T-Shirt',
  price: 35,
  currency: 'RM',
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
};
const blueGraffitiShirt = {
  name: 'Blue Graffiti Stripe Shirt \u2013 Retro Hong Kong Style, Oversized Fit & Casual Long Sleeve Streetwear',
  price: 37,
  currency: 'RM',
  sizes: ['S', 'M', 'L']
};
const y2kDevilHoodie = {
  name: 'Y2K Devil Hoodie \u2013 Vintage Graphic Patchwork, Heavyweight Fabric & Oversized Zip-Up Streetwear Jacket',
  price: 50,
  currency: 'RM',
  sizes: ['S', 'M', 'L', 'XL']
};
const vintageCatCardigan = {
  name: 'Vintage Cat Cardigan \u2013 Retro Graphic Design, Relaxed Oversized Fit & Cozy Knit Streetwear Outerwear',
  price: 60,
  currency: 'RM',
  sizes: ['M', 'L', 'XL']
};
const essentialTee = {
  name: 'Essential Tee \u2013 2026 Collection, Relaxed Oversized Fit & Modern Minimalist Streetwear T-Shirt',
  price: 53,
  currency: 'RM',
  sizes: ['S', 'M', 'L', 'XL']
};
const galleryProducts = { 'hollow-knit': cardigan, 'off-script-tee': offScriptTee, 'wide-leg-pants': wideLegPants, 'dropout-bear-backpack': dropoutBearBackpack };
let activeProduct = cardigan;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    const sizeSelect = button.closest('.product-card').querySelector('.product-size-select');
    if (sizeSelect && !sizeSelect.value) {
      showToast('Choose a size before adding this product');
      sizeSelect.focus();
      return;
    }
    addToBag(button.dataset.name, Number(button.dataset.price), button.closest('.product-card').querySelector('img').src, {
      size: sizeSelect?.value || '',
      currency: button.dataset.currency || 'USD',
      shippingIncluded: button.dataset.shipping === 'included'
    });
    button.innerHTML = 'Added to bag <span>✓</span>';
    setTimeout(() => { button.innerHTML = 'Add to bag <span>+</span>'; }, 1400);
  });
});
document.querySelectorAll('.product-size-select').forEach((select) => {
  select.addEventListener('change', () => {
    select.closest('.product-card').querySelector('.add-button').disabled = !select.value;
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  if (!email.checkValidity()) return email.reportValidity();
  showToast('You’re on the list. Welcome to uncommon.');
  event.currentTarget.reset();
});

document.querySelector('.bag-button').addEventListener('click', () => {
  openCart();
});

const drawer = document.querySelector('.cart-drawer');
const backdrop = document.querySelector('.cart-backdrop');
function openCart() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add('open'));
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { backdrop.hidden = true; }, 300);
}
function renderCart() {
  bagCount = cart.length;
  count.textContent = bagCount;
  document.querySelector('.drawer-count').textContent = `(${cart.length})`;
  document.querySelector('.cart-subtotal').textContent = formatCartTotals();
  document.querySelector('.cart-items').innerHTML = cart.map((item, index) => `<div class="cart-row"><img src="${safeImage(item.image)}" alt=""><div class="cart-row-info"><b>${escapeHTML(item.name)}</b><span>${item.size ? `Size ${escapeHTML(item.size)} · ` : ''}${formatPrice(item.price, item.currency)}${item.shippingIncluded ? ' · Shipping included' : ''}</span><button data-remove="${index}">Remove</button></div></div>`).join('');
  document.querySelector('.cart-items').querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => {
    cart.splice(Number(button.dataset.remove), 1);
    saveCart();
    renderCart();
  }));
}
document.querySelector('.cart-close').addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });
document.querySelector('.checkout-button').addEventListener('click', () => {
  if (!cart.length) { showToast('Your bag is empty. Add an item before checkout.'); return; }
  window.location.href = 'checkout.html';
});

function cartStorageKey() { return 'uncommon:cart:guest'; }
function loadCart() {
  cart.length = 0;
  const saved = [];
  const legacyKeys = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith('uncommon:cart:')) {
      saved.push(...readStoredCart(key));
      if (key !== cartStorageKey()) legacyKeys.push(key);
    }
  }
  cart.push(...saved);
  legacyKeys.forEach((key) => localStorage.removeItem(key));
  saveCart();
  renderCart();
}
function readStoredCart(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) => item && typeof item.name === 'string' && Number.isFinite(Number(item.price)) && Number(item.price) >= 0 && typeof item.image === 'string')
      .map((item) => {
        const product = [cardigan, offScriptTee, wideLegPants, dropoutBearBackpack, vintageDenimTee, vintageGraffitiTee, heavyweightCottonTee, pixelAppleTee, blueGraffitiShirt, y2kDevilHoodie, vintageCatCardigan, essentialTee].find((candidate) => candidate.name === item.name)
          || (item.name === 'Off Script Tee' ? offScriptTee : item.name === 'Everyday Wide Leg' ? wideLegPants : item.name === 'Side Quest Backpack' ? dropoutBearBackpack : null);
        return {
          name: product?.name || item.name.slice(0, 240),
          price: product?.price ?? Number(item.price),
          image: item.image,
          size: product ? (product.sizes?.includes(item.size) ? item.size : '') : String(item.size || ''),
          currency: product?.currency || (item.currency === 'RM' ? 'RM' : 'USD'),
          shippingIncluded: Boolean(product) || Boolean(item.shippingIncluded)
        };
      });
  } catch { return []; }
}

function saveCart() {
  try { localStorage.setItem(cartStorageKey(), JSON.stringify(cart)); }
  catch { showToast('Your bag could not be saved in this browser.'); }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function safeImage(value) {
  try {
    const url = new URL(value, window.location.href);
    const isUnsplash = url.protocol === 'https:' && url.hostname === 'images.unsplash.com';
    const isLocalProductImage = url.origin === window.location.origin && url.pathname.startsWith('/assets/products/');
    return isUnsplash || isLocalProductImage ? escapeHTML(url.href) : '';
  } catch { return ''; }
}

function addToBag(name, price, image, options = {}) {
  cart.push({ name, price, image, size: options.size || '', currency: options.currency || 'USD', shippingIncluded: Boolean(options.shippingIncluded) });
  bagCount = cart.length;
  saveCart();
  renderCart();
  showToast(`${name} added to your bag`);
}

function formatPrice(amount, currency = 'USD') {
  return currency === 'RM' ? `RM${amount}` : `$${amount}`;
}

function formatCartTotals() {
  if (!cart.length) return 'RM0';
  const totals = new Map();
  cart.forEach((item) => totals.set(item.currency || 'USD', (totals.get(item.currency || 'USD') || 0) + item.price));
  return [...totals.entries()].map(([currency, amount]) => formatPrice(amount, currency)).join(' · ');
}

const productDialog = document.querySelector('.product-dialog');
const galleryImage = document.querySelector('.gallery-main-image');
const galleryThumbnails = document.querySelector('.gallery-thumbnails');
const gallerySizeSelect = document.querySelector('.gallery-size-select');
const galleryAddButton = document.querySelector('.gallery-add');
let galleryIndex = 0;

function showGalleryImage(index) {
  galleryIndex = (index + activeProduct.images.length) % activeProduct.images.length;
  const image = activeProduct.images[galleryIndex];
  galleryImage.src = image.src;
  galleryImage.alt = image.alt;
  document.querySelector('.gallery-index').textContent = `${galleryIndex + 1} / ${activeProduct.images.length}`;
  galleryThumbnails.querySelectorAll('.gallery-thumb').forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === galleryIndex);
    button.setAttribute('aria-pressed', String(buttonIndex === galleryIndex));
  });
}

function openProductGallery(productKey) {
  activeProduct = galleryProducts[productKey];
  if (!activeProduct) return;
  document.querySelector('#gallery-title').textContent = activeProduct.name;
  document.querySelector('.gallery-price').textContent = `${formatPrice(activeProduct.price, activeProduct.currency)} · Shipping included`;
  document.querySelector('.gallery-description').textContent = activeProduct.description || 'Loose-fit open-knit comfort with a hood, made for easy everyday layering.';
  gallerySizeSelect.setAttribute('aria-label', `Choose ${activeProduct.name} size`);
  gallerySizeSelect.innerHTML = '<option value="" selected disabled>Select a size</option>' + activeProduct.sizes.map((size) => `<option value="${size}">${size}</option>`).join('');
  galleryAddButton.disabled = true;
  galleryThumbnails.innerHTML = activeProduct.images.map((image, index) => `<button type="button" class="gallery-thumb" aria-label="Show photo ${index + 1}" aria-pressed="false"><img src="${image.src}" alt=""></button>`).join('');
  galleryThumbnails.querySelectorAll('.gallery-thumb').forEach((button, index) => button.addEventListener('click', () => showGalleryImage(index)));
  showGalleryImage(0);
  productDialog.showModal();
}

document.querySelectorAll('[data-gallery]').forEach((button) => button.addEventListener('click', () => openProductGallery(button.dataset.gallery)));
document.querySelector('.product-dialog-close').addEventListener('click', () => productDialog.close());
productDialog.addEventListener('click', (event) => { if (event.target === productDialog) productDialog.close(); });
document.querySelector('.gallery-prev').addEventListener('click', () => showGalleryImage(galleryIndex - 1));
document.querySelector('.gallery-next').addEventListener('click', () => showGalleryImage(galleryIndex + 1));
gallerySizeSelect.addEventListener('change', () => { galleryAddButton.disabled = !gallerySizeSelect.value; });
galleryAddButton.addEventListener('click', () => {
  if (!gallerySizeSelect.value) {
    showToast('Choose a size before adding this product');
    gallerySizeSelect.focus();
    return;
  }
  addToBag(activeProduct.name, activeProduct.price, activeProduct.images[0].src, {
    size: gallerySizeSelect.value,
    currency: activeProduct.currency,
    shippingIncluded: true
  });
});

loadCart();
