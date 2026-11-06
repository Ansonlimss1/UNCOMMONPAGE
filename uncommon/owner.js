import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js';
import { getAuth, onAuthStateChanged, reload, getIdToken, sendEmailVerification, signOut } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js';
import { getFirestore, collection, doc, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js';

const OWNER_EMAIL = 'ansonlim04@gmail.com';
const PAYMENT_STATUSES = ['awaiting-verification', 'paid', 'rejected'];
const SHIPPING_STATUSES = ['Order received', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const config = window.UNCOMMON_FIREBASE_CONFIG;
const statusNode = document.querySelector('.owner-status');
const ordersNode = document.querySelector('.owner-orders');
let db;
let authClient;
let orderListenerStarted = false;

function setAuthActions({ verify = false, refresh = false, returnToLogin = false } = {}) {
  document.querySelector('.owner-verify').hidden = !verify;
  document.querySelector('.owner-refresh').hidden = !refresh;
  document.querySelector('.owner-return').hidden = !returnToLogin;
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function optionList(options, selected) {
  return options.map((value) => `<option value="${escapeHTML(value)}"${value === selected ? ' selected' : ''}>${escapeHTML(value)}</option>`).join('');
}

function dateLabel(timestamp) {
  return timestamp?.toDate ? timestamp.toDate().toLocaleString() : 'Recently placed';
}

function renderOrders(snapshot) {
  const orders = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
  if (!orders.length) {
    ordersNode.innerHTML = '<p class="owner-empty">No customer orders yet. Completed checkouts will appear here.</p>';
    return;
  }
  ordersNode.innerHTML = orders.map((order) => {
    const address = order.shippingAddress || {};
    const lines = Array.isArray(order.items) ? order.items.map((item) => `<div class="owner-order-line"><span>${escapeHTML(item.name)}${item.size ? ` · Size ${escapeHTML(item.size)}` : ''}</span><b>RM${Number(item.price) || 0}</b></div>`).join('') : '';
    const addressLines = [address.name, address.phone, address.street, [address.city, address.state, address.postcode].filter(Boolean).join(', '), address.country].filter(Boolean).map(escapeHTML).join('<br>');
    return `<article class="owner-order"><div class="owner-order-head"><div><h2>Order ${escapeHTML(order.id)}</h2><p>${escapeHTML(order.customerName || 'Customer')} · ${escapeHTML(order.customerEmail || 'No email provided')}</p><time>${escapeHTML(dateLabel(order.createdAt))}</time></div><strong class="owner-order-total">RM${Number(order.total) || 0}</strong></div><div class="owner-order-grid"><section><h3>Products and payment</h3><div class="owner-order-lines">${lines}</div><p class="owner-address">Method: ${escapeHTML(order.paymentMethod || 'Not recorded')}<br>Payment: ${escapeHTML(order.paymentStatus || 'Awaiting verification')}</p></section><section><h3>Shipping address</h3><div class="owner-address">${addressLines || 'No shipping address recorded'}</div></section></div><form class="owner-order-controls" data-order-id="${escapeHTML(order.id)}"><label>Payment status<select name="paymentStatus">${optionList(PAYMENT_STATUSES, order.paymentStatus || 'awaiting-verification')}</select></label><label>Shipping status<select name="shippingStatus">${optionList(SHIPPING_STATUSES, order.shippingStatus || 'Order received')}</select></label><button class="owner-save" type="submit">Save updates</button></form></article>`;
  }).join('');
}

if (!config?.apiKey || !config?.projectId) {
  document.body.classList.remove('auth-checking');
  statusNode.textContent = 'Firebase is not configured for this site.';
  ordersNode.replaceChildren();
} else {
  const app = initializeApp(config);
  authClient = getAuth(app);
  db = getFirestore(app);
  onAuthStateChanged(authClient, async (user) => {
    if (!user) {
      window.location.replace('index.html?ownerLogin=1');
      return;
    }
    document.body.classList.remove('auth-checking', 'auth-locked');
    document.querySelector('.owner-user').textContent = user.email || 'Signed in';
    try {
      await reload(user);
      await getIdToken(user, true);
    } catch (error) {
      console.warn('Could not refresh owner sign-in state:', error);
    }
    if (user.email?.toLowerCase() !== OWNER_EMAIL) {
      statusNode.textContent = `This account (${user.email || 'no email'}) is not the designated owner account. Sign out, then choose “Login as owner” and use username anson.`;
      ordersNode.replaceChildren();
      setAuthActions({ returnToLogin: true });
      return;
    }
    if (!user.emailVerified) {
      statusNode.textContent = `The owner account ${user.email} still needs email verification. Open its Firebase verification email, then return and refresh access.`;
      ordersNode.replaceChildren();
      setAuthActions({ verify: true, refresh: true, returnToLogin: true });
      return;
    }
    setAuthActions();
    statusNode.textContent = '';
    if (orderListenerStarted) return;
    orderListenerStarted = true;
    document.querySelector('.owner-user').textContent = user.email;
    onSnapshot(collection(db, 'orders'), renderOrders, (error) => {
      console.error('Could not load owner orders:', error);
      statusNode.textContent = error.code === 'permission-denied'
        ? 'Access denied. Deploy the owner Firestore rules and sign in again with the verified owner account.'
        : 'Orders could not be loaded. Check the Firebase project and Firestore setup.';
      ordersNode.replaceChildren();
    });
  }, (error) => {
    document.body.classList.remove('auth-checking');
    statusNode.textContent = error.message || 'Could not verify this sign-in.';
  });
}

document.querySelector('.owner-verify').addEventListener('click', async () => {
  const user = authClient?.currentUser;
  if (!user) return;
  try {
    await sendEmailVerification(user);
    statusNode.textContent = `Verification email sent to ${user.email}. Check your inbox and spam folder, then refresh access.`;
  } catch (error) {
    statusNode.textContent = error.message || 'Could not resend the verification email.';
  }
});

document.querySelector('.owner-refresh').addEventListener('click', async () => {
  const user = authClient?.currentUser;
  if (!user) return;
  try {
    await reload(user);
    await getIdToken(user, true);
    if (user.email?.toLowerCase() === OWNER_EMAIL && user.emailVerified) window.location.reload();
    else statusNode.textContent = 'Firebase still reports this owner email as unverified. Open the verification email first, then try again.';
  } catch (error) {
    statusNode.textContent = error.message || 'Could not refresh owner access.';
  }
});

document.querySelector('.owner-return').addEventListener('click', async () => {
  try { await signOut(authClient); } finally { window.location.replace('index.html?ownerLogin=1'); }
});

document.querySelector('.owner-signout').addEventListener('click', async () => {
  try {
    await signOut(authClient);
    window.location.replace('index.html');
  } catch (error) {
    statusNode.textContent = error.message || 'Sign out failed.';
  }
});

ordersNode.addEventListener('submit', async (event) => {
  const form = event.target.closest('.owner-order-controls');
  if (!form) return;
  event.preventDefault();
  const button = form.querySelector('.owner-save');
  button.disabled = true;
  button.textContent = 'Saving...';
  statusNode.textContent = '';
  try {
    await updateDoc(doc(db, 'orders', form.dataset.orderId), {
      paymentStatus: form.elements.paymentStatus.value,
      shippingStatus: form.elements.shippingStatus.value
    });
    statusNode.textContent = 'Order updated. The customer profile will reflect the new status.';
  } catch (error) {
    console.error('Could not update order:', error);
    statusNode.textContent = error.code === 'permission-denied'
      ? 'Update denied. Confirm that the owner rules are deployed and this account email is verified.'
      : error.message || 'Could not update this order.';
  } finally {
    button.disabled = false;
    button.textContent = 'Save updates';
  }
});
