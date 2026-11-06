const CART_KEY = 'uncommon:cart:guest';
const phone = '60127769099';

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(value) ? value.filter((item) => item && typeof item.name === 'string') : [];
  } catch { return []; }
}

function money(value, currency = 'RM') {
  const amount = Number(value) || 0;
  return currency === 'RM' ? `RM${amount}` : `$${amount}`;
}

const items = readCart();
const list = document.querySelector('.checkout-items');
if (!items.length) {
  const empty = document.createElement('p');
  empty.textContent = 'Your bag is empty. Add an item before continuing.';
  empty.className = 'payment-empty';
  list.append(empty);
  document.querySelector('.checkout-submit').disabled = true;
} else {
  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'checkout-item';
    const image = document.createElement('img');
    try {
      const url = new URL(item.image, window.location.href);
      if (url.origin === window.location.origin && url.pathname.startsWith('/assets/products/')) image.src = url.href;
    } catch {}
    image.alt = '';
    const details = document.createElement('div');
    const name = document.createElement('b');
    name.textContent = item.name.slice(0, 240);
    const meta = document.createElement('small');
    meta.textContent = `${item.size ? `Size ${item.size} · ` : ''}${item.shippingIncluded ? 'Shipping included' : 'Shipping arranged by WhatsApp'}`;
    details.append(name, meta);
    const price = document.createElement('strong');
    price.textContent = money(item.price, item.currency);
    row.append(image, details, price);
    list.append(row);
  });
}

const totals = new Map();
items.forEach((item) => {
  const currency = item.currency === 'RM' ? 'RM' : 'USD';
  totals.set(currency, (totals.get(currency) || 0) + (Number(item.price) || 0));
});
document.querySelector('.checkout-total-value').textContent = [...totals.entries()].map(([currency, total]) => money(total, currency)).join(' · ') || 'RM0';

document.querySelector('#shipping-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('.checkout-form-status');
  if (!items.length) {
    status.textContent = 'Your bag is empty. Add an item before continuing.';
    status.classList.add('error');
    return;
  }
  const form = event.currentTarget;
  const address = {
    name: form.elements.name.value.trim(),
    phone: form.elements.phone.value.trim(),
    street: form.elements.address.value.trim(),
    city: form.elements.city.value.trim(),
    state: form.elements.state.value.trim(),
    postcode: form.elements.postcode.value.trim()
  };
  const productLines = items.map((item) => `• ${item.name}${item.size ? ` — Size ${item.size}` : ''} — ${money(item.price, item.currency)}`);
  const addressLines = [address.name, address.phone, address.street, `${address.city}, ${address.state} ${address.postcode}`, 'Malaysia'];
  const totalText = [...totals.entries()].map(([currency, total]) => money(total, currency)).join(' · ') || 'RM0';
  const message = `Hi uncommon, I would like to order:\n${productLines.join('\n')}\nTotal: ${totalText}\n\nShipping address:\n${addressLines.join('\n')}\n\nPlease confirm my order and delivery details.`;
  document.querySelector('.contact-order-details').textContent = `Products\n${productLines.join('\n')}\n\nTotal: ${totalText}\n\nShipping address\n${addressLines.join('\n')}`;
  const link = document.querySelector('.shipping-contact-link');
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  document.querySelector('.shipping-contact-dialog').showModal();
  status.textContent = '';
});

document.querySelector('.shipping-contact-link').addEventListener('click', () => {
  window.setTimeout(() => window.location.assign('index.html'), 700);
});
