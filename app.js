// ElectroTech Store - Main Application
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    initI18n();
    initCart();
    initAuth();
    buildCategoryFilter();
    buildProductCards();
    initSearch();
    initMobileMenu();
    initScrollAnimations();

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            if (email && email.includes('@')) {
                showToast('✨ ' + t('newsletterSuccess') || 'Successfully subscribed to our newsletter!', 'success');
                this.reset();
            } else {
                showToast(t('invalidEmail') || 'Please enter a valid email', 'error');
            }
        });
    }
});

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
}

// ============================================
// SHOPPING CART SYSTEM
// ============================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    updateCartBadge();

    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }
}

function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    renderCartItems();
}

function closeCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const lang = getLanguage();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
        showToast((lang === 'ar' ? product.titleAr : product.title) + ' — ' + t('quantityUpdated'), 'success');
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            titleAr: product.titleAr,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showToast((lang === 'ar' ? product.titleAr : product.title) + ' ' + t('itemAdded'), 'success');
    }

    saveCart();
    updateCartBadge();

    // Pulse animation on badge
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.style.animation = 'pulse 0.3s ease';
        setTimeout(() => badge.style.animation = '', 300);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCartItems();
    showToast(t('itemRemoved'), 'warning');
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartBadge();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    if (!container) return;

    const lang = getLanguage();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>${t('cartEmptyMsg')}</p>
            </div>`;
        if (footer) footer.style.display = 'none';
        return;
    }

    if (footer) footer.style.display = 'block';

    container.innerHTML = cart.map(item => {
        const title = lang === 'ar' ? item.titleAr : item.title;
        return `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${title}" onerror="this.src='https://placehold.co/70x70/e2e8f0/64748b?text=No+Img'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${title}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                    <button class="qty-btn delete" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>`;
    }).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = '$' + total.toLocaleString();
}

function checkout() {
    if (cart.length === 0) {
        showToast(t('cartEmptyMsg'), 'warning');
        return;
    }
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// ============================================
// DYNAMIC PRODUCT RENDERING
// ============================================

let currentCategory = 'all';

function buildCategoryFilter() {
    const container = document.getElementById('categoryFilter');
    if (!container || typeof CATEGORIES === 'undefined') return;

    const lang = getLanguage();
    container.innerHTML = CATEGORIES.map(cat => {
        const label = lang === 'ar' ? cat.labelAr : cat.label;
        return `<button class="filter-tab${cat.id === currentCategory ? ' active' : ''}"
                    data-category="${cat.id}" onclick="filterCategory('${cat.id}')">${label}</button>`;
    }).join('');
}

function filterCategory(categoryId) {
    currentCategory = categoryId;
    document.querySelectorAll('.category-circle').forEach(item => {
        item.classList.toggle('active', item.dataset.category === categoryId);
    });
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === categoryId);
    });
    buildProductCards();
}

function buildProductCards() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    const lang = getLanguage();
    const filtered = currentCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === currentCategory);

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="text-align:center; color: var(--color-gray-500); grid-column:1/-1;">${t('noResults') || 'No products found'}</p>`;
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const title = lang === 'ar' ? product.titleAr : product.title;
        const catObj = (CATEGORIES || []).find(c => c.id === product.category) || {};
        const catName = lang === 'ar' ? (catObj.labelAr || '') : (catObj.label || '');

        // Discount badge or label
        const hasDiscount = product.discount > 0;
        let badgeHTML = '';
        if (hasDiscount) {
            badgeHTML = `<span class="discount-badge">-${product.discount}% OFF</span>`;
        } else if (product.label) {
            const bgMap = { 'new': '#10b981', 'hot': '#f59e0b', 'sale': '#ef4444' };
            badgeHTML = `<span class="discount-badge" style="background:${bgMap[product.label] || '#6366f1'}">${product.label.toUpperCase()}</span>`;
        }

        // Stars
        const full = Math.floor(product.rating);
        const half = product.rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < full) stars += '<i class="fas fa-star"></i>';
            else if (i === full && half) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }

        // Colors
        const colorsHTML = product.colors && product.colors.length > 0 ? `
            <div class="card-colors">
                ${product.colors.map(c => `<span class="color-dot" style="background:${c}"></span>`).join('')}
            </div>` : '';

        // Price
        const dp = hasDiscount ? (product.price * (1 - product.discount / 100)).toFixed(0) : product.price;
        const priceHTML = hasDiscount
            ? `<div class="card-price"><span class="current-price">$${dp}</span><span class="old-price">$${product.price}</span></div>`
            : `<div class="card-price"><span class="current-price">$${product.price}</span></div>`;

        return `
        <div class="product-card-v2 fade-in" data-product-id="${product.id}">
            <div class="card-image">
                ${badgeHTML}
                <button class="wishlist-btn" onclick="toggleWishlist(this,event)"><i class="far fa-heart"></i></button>
                <img src="${product.image}" alt="${title}" loading="lazy"
                     onerror="this.src='https://placehold.co/400x400/f1f5f9/64748b?text=No+Image'">
            </div>
            <div class="card-body">
                <div class="card-category">${catName}</div>
                <h3 class="card-title">${title}</h3>
                <div class="card-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${product.rating})</span>
                </div>
                ${colorsHTML}
                ${priceHTML}
                <button class="card-add-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    <span data-i18n="addToCart">${t('addToCart') || 'Add to Cart'}</span>
                </button>
            </div>
        </div>`;
    }).join('');

    requestAnimationFrame(() => {
        grid.querySelectorAll('.fade-in').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 80);
        });
    });
}

// Wishlist toggle
function toggleWishlist(btn, e) {
    e.stopPropagation();
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('active')) {
        icon.className = 'fas fa-heart';
        showToast('Added to wishlist ❤️', 'success');
    } else {
        icon.className = 'far fa-heart';
    }
}

// Color selector (backward compat)
function initColorSelectors() {}




// ============================================
// SEARCH SYSTEM
// ============================================

function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchOverlay) searchOverlay.classList.add('open');
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
                showAllSearchResults();
            }
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            if (searchOverlay) searchOverlay.classList.remove('open');
        });
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) searchOverlay.classList.remove('open');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query === '') {
                showAllSearchResults();
                return;
            }
            const lang = getLanguage();
            const results = PRODUCTS.filter(p => {
                const title = lang === 'ar' ? p.titleAr : p.title;
                const cat = p.category;
                return title.toLowerCase().includes(query) || cat.toLowerCase().includes(query);
            });
            displaySearchResults(results);
        });
    }

    // Escape key closes search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) {
            searchOverlay.classList.remove('open');
        }
    });
}

function showAllSearchResults() {
    if (typeof PRODUCTS !== 'undefined') {
        displaySearchResults(PRODUCTS);
    }
}

function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    const lang = getLanguage();

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>${t('noSearchResults')}</p>
            </div>`;
        return;
    }

    container.innerHTML = results.map(p => {
        const title = lang === 'ar' ? p.titleAr : p.title;
        const catObj = CATEGORIES.find(c => c.id === p.category);
        const catLabel = catObj ? (lang === 'ar' ? catObj.labelAr : catObj.label) : p.category;
        return `
        <div class="search-result-item" onclick="searchAddToCart(${p.id})">
            <img class="search-result-img" src="${p.image}" alt="${title}"
                 onerror="this.src='https://placehold.co/50x50/e2e8f0/64748b?text=?'">
            <div class="search-result-info">
                <h4>${title}</h4>
                <p>${catLabel} — $${p.price}</p>
            </div>
        </div>`;
    }).join('');
}

function searchAddToCart(productId) {
    addToCart(productId);
    const overlay = document.getElementById('searchOverlay');
    if (overlay) overlay.classList.remove('open');
}

// ============================================
// AUTH SYSTEM
// ============================================

function initAuth() {
    const currentUser = JSON.parse(localStorage.getItem('electro_current_user'));
    const loginBtn = document.getElementById('loginBtn');

    if (currentUser && loginBtn) {
        // Change to profile/logout
        loginBtn.innerHTML = '<i class="fas fa-user-check"></i>';
        loginBtn.title = currentUser.name || 'Account';
        loginBtn.href = '#';
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Logout?')) {
                localStorage.removeItem('electro_current_user');
                window.location.reload();
            }
        });

        // Show admin link if admin
        if (currentUser.role === 'admin') {
            const navLinks = document.getElementById('navLinks');
            if (navLinks && !navLinks.querySelector('[href="admin.html"]')) {
                const adminLink = document.createElement('a');
                adminLink.href = 'admin.html';
                adminLink.setAttribute('data-i18n', 'admin');
                adminLink.textContent = t('admin');
                navLinks.appendChild(adminLink);
            }
        }
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Also observe new cards when they appear
    const grid = document.getElementById('productsGrid');
    if (grid) {
        const mo = new MutationObserver(() => {
            grid.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
        });
        mo.observe(grid, { childList: true });
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

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

// ============================================
// PRODUCT CAROUSEL
// ============================================

let carouselPosition = 0;

function buildCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track || typeof PRODUCTS === 'undefined') return;

    const lang = getLanguage();
    const recommended = PRODUCTS.slice(0, 8);
    
    track.innerHTML = recommended.map(product => {
        const title = lang === 'ar' ? product.titleAr : product.title;
        const catObj = (CATEGORIES || []).find(c => c.id === product.category) || {};
        const catName = lang === 'ar' ? (catObj.labelAr || '') : (catObj.label || '');

        const hasDiscount = product.discount > 0;
        let badgeHTML = '';
        if (hasDiscount) {
            badgeHTML = `<span class="discount-badge">-${product.discount}%</span>`;
        } else if (product.label) {
            badgeHTML = `<span class="discount-badge">${product.label.toUpperCase()}</span>`;
        }

        const full = Math.floor(product.rating);
        const half = product.rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < full) stars += '<i class="fas fa-star"></i>';
            else if (i === full && half) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }

        const dp = hasDiscount ? (product.price * (1 - product.discount / 100)).toFixed(0) : product.price;
        const priceHTML = hasDiscount
            ? `<div class="card-price"><span class="current-price">$${dp}</span><span class="old-price">$${product.price}</span></div>`
            : `<div class="card-price"><span class="current-price">$${product.price}</span></div>`;

        return `
        <div class="carousel-item-v2">
            <div class="product-card-v2">
                <div class="card-image">
                    ${badgeHTML}
                    <button class="wishlist-btn" onclick="toggleWishlist(this,event)"><i class="far fa-heart"></i></button>
                    <img src="${product.image}" alt="${title}" loading="lazy"
                         onerror="this.src='https://placehold.co/400x400/f1f5f9/64748b?text=No+Image'">
                </div>
                <div class="card-body">
                    <div class="card-category">${catName}</div>
                    <h3 class="card-title">${title}</h3>
                    <div class="card-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-count">(${product.rating})</span>
                    </div>
                    ${priceHTML}
                    <button class="card-add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        <span data-i18n="addToCart">${t('addToCart')}</span>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}


function carouselNext() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const itemWidth = 320 + 24;
    const maxScroll = (track.children.length - 3) * itemWidth;
    carouselPosition = Math.min(carouselPosition + itemWidth, maxScroll);
    track.style.transform = `translateX(-${carouselPosition}px)`;
}

function carouselPrev() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const itemWidth = 320 + 24;
    carouselPosition = Math.max(carouselPosition - itemWidth, 0);
    track.style.transform = `translateX(-${carouselPosition}px)`;
}

// Build carousel on page load
setTimeout(buildCarousel, 500);
