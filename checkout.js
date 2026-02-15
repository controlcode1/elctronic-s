// ElectroTech Checkout Page
// ==========================

document.addEventListener('DOMContentLoaded', function () {
    initI18n();
    loadOrderSummary();
    initCheckoutForm();
    initMobileMenu();
});

// Mobile Menu (same as main app.js)
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
}

// Load cart and display order summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('orderItems');
    const lang = getLanguage();

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-order"><i class="fas fa-shopping-bag"></i><p data-i18n="cartEmpty">Your cart is empty</p></div>`;
        document.getElementById('placeOrderBtn').disabled = true;
        return;
    }

    // Display items
    container.innerHTML = cart.map(item => {
        const title = lang === 'ar' ? item.titleAr : item.title;
        return `
        <div class="order-item">
            <img src="${item.image}" alt="${title}" 
                 onerror="this.src='https://placehold.co/60x60/e2e8f0/64748b?text=?'">
            <div class="order-item-info">
                <h4>${title}</h4>
                <p>${t('quantity')}: ${item.quantity}</p>
            </div>
            <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>`;
    }).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 10; // Fixed shipping fee
    const total = subtotal + shipping;

    document.getElementById('subtotalAmount').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shippingAmount').textContent = '$' + shipping.toFixed(2);
    document.getElementById('totalAmount').textContent = '$' + total.toFixed(2);
}

// Initialize checkout form
function initCheckoutForm() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }
}

// Handle order submission
function handlePlaceOrder(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const notes = document.getElementById('orderNotes').value.trim();

    // Validate
    if (!name || !email || !phone || !address) {
        showToast(t('fillAllFields'), 'warning');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast(t('invalidEmail'), 'error');
        return;
    }

    // Get cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showToast(t('cartEmpty'), 'warning');
        return;
    }

    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 10;
    const total = subtotal + shipping;

    // Create order object
    const order = {
        id: Date.now(),
        orderNumber: 'ORD-' + Date.now().toString().slice(-8),
        customer: { name, email, phone, address },
        items: cart,
        subtotal,
        shipping,
        total,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show success modal
    showSuccessModal(order.orderNumber);
}

// Show success modal
function showSuccessModal(orderNumber) {
    const modal = document.getElementById('successModal');
    const orderNum = document.getElementById('orderNumber');
    if (modal && orderNum) {
        orderNum.textContent = orderNumber;
        modal.classList.add('show');
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const msg = document.getElementById('toastMessage');
    if (!toast || !msg) return;

    toast.className = 'toast-notification toast-' + type;
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    toast.querySelector('i').className = 'fas ' + (icons[type] || icons.success);
    msg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
