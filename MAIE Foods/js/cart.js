/* MAIE FOODS — Cart & order storage (localStorage backend) */
const CART_KEY = 'maie_cart';
const ORDERS_KEY = 'maie_orders';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast('Added to cart');
}

function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateOrderId() {
  return 'MAIE-' + Date.now().toString(36).toUpperCase();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('cart-badge--hidden', count === 0);
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('toast--show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('toast--show'), 2500);
}

function initCartButtons() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.addCart;
      const qty = parseInt(btn.dataset.qty || '1', 10);
      addToCart(id, qty);
    });
  });
  updateCartBadge();
}

function renderCartPage() {
  const container = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');
  if (!container) return;

  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    if (summary) summary.classList.add('hidden');
    document.querySelector('.cart-layout')?.classList.add('cart-layout--empty');
    return;
  }

  if (empty) empty.classList.add('hidden');
  if (summary) summary.classList.remove('hidden');
  document.querySelector('.cart-layout')?.classList.remove('cart-layout--empty');

  container.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if (!p) return '';
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="cart-item__img" />
        <div class="cart-item__info">
          <h3 class="cart-item__name">${p.name}</h3>
          <p class="cart-item__unit">${p.unit}</p>
          <p class="cart-item__price">${formatPrice(p.price)}</p>
        </div>
        <div class="cart-item__qty">
          <button class="qty-btn" data-action="decrease" data-id="${p.id}" aria-label="Decrease">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-id="${p.id}" aria-label="Increase">+</button>
        </div>
        <p class="cart-item__total">${formatPrice(p.price * item.qty)}</p>
        <button class="cart-item__remove" data-remove="${p.id}" aria-label="Remove">✕</button>
      </div>`;
  }).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;

  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
  document.getElementById('cart-total').textContent = formatPrice(total);

  container.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCart().find(i => i.id === id);
      if (!item) return;
      const delta = btn.dataset.action === 'increase' ? 1 : -1;
      updateCartQty(id, item.qty + delta);
      renderCartPage();
    });
  });

  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.remove);
      renderCartPage();
    });
  });
}

function initCheckout() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  const cart = getCart();
  if (!cart.length) {
    window.location.href = 'cart.html';
    return;
  }

  renderCheckoutSummary();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const paymentMethod = form.querySelector('input[name="payment"]:checked')?.value || 'cod';
    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: paymentMethod === 'cod' ? 'confirmed' : 'paid',
      items: getCart().map(i => ({ ...i, product: getProductById(i.id) })),
      subtotal: getCartTotal(),
      shipping: getCartTotal() >= 500 ? 0 : 49,
      total: getCartTotal() + (getCartTotal() >= 500 ? 0 : 49),
      customer: {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        pincode: form.pincode.value
      },
      payment: paymentMethod
    };

    saveOrder(order);
    clearCart();
    sessionStorage.setItem('maie_last_order', JSON.stringify(order));
    window.location.href = 'order-success.html';
  });
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkout-items');
  if (!el) return;

  const cart = getCart();
  el.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if (!p) return '';
    return `<div class="checkout-line">
      <span>${p.name} × ${item.qty}</span>
      <span>${formatPrice(p.price * item.qty)}</span>
    </div>`;
  }).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 49;
  document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
  document.getElementById('checkout-total').textContent = formatPrice(subtotal + shipping);
}

function renderOrderSuccess() {
  const el = document.getElementById('order-details');
  if (!el) return;

  let order;
  try {
    order = JSON.parse(sessionStorage.getItem('maie_last_order'));
  } catch {
    order = null;
  }

  if (!order) {
    window.location.href = 'index.html';
    return;
  }

  el.innerHTML = `
    <p class="order-id">Order ID: <strong>${order.id}</strong></p>
    <p>Status: <span class="order-status">${order.status === 'paid' ? 'Payment Received' : 'Confirmed (COD)'}</span></p>
    <p>Total: <strong>${formatPrice(order.total)}</strong></p>
    <p>Delivery to: ${order.customer.name}, ${order.customer.city} — ${order.customer.pincode}</p>
    <p>Payment: ${order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'upi' ? 'UPI (Simulated)' : 'Card (Simulated)'}</p>
  `;
}
