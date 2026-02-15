// Wishlist/Favorites System
// =========================

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function initWishlist() {
    updateWishlistUI();

    // Add click handlers for all wishlist buttons
    document.querySelectorAll('.action-btn[title="Add to Wishlist"]').forEach((btn, index) => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            const product = extractProductFromCard(card, index + 1);
            toggleWishlist(product, this);
        });
    });
}

function toggleWishlist(product, btn) {
    const existingIndex = wishlist.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        btn.innerHTML = '<i class="far fa-heart"></i>';
        btn.style.background = 'var(--glass-bg-strong)';
        showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
        // Add to wishlist
        wishlist.push(product);
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        btn.style.background = 'var(--gradient-danger)';
        showToast(`Added ${product.name} to wishlist!`, 'success');
    }

    saveWishlist();
    updateWishlistUI();
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateWishlistUI() {
    // Update any wishlist counters or badges
    const wishlistCount = wishlist.length;
    // Could add a wishlist badge in navigation if needed
}

function openWishlistPage() {
    // Navigate to wishlist page (to be created)
    window.location.href = 'wishlist.html';
}

// Product Quick View Modal
// ========================

function initQuickView() {
    document.querySelectorAll('.action-btn[title="Quick View"]').forEach((btn, index) => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            const product = extractProductFromCard(card, index + 1);
            showQuickView(product);
        });
    });
}

function showQuickView(product) {
    const modal = createQuickViewModal(product);
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add('show'), 10);

    // Close on backdrop click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeQuickView(modal);
        }
    });
}

function closeQuickView(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}

function createQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-modal-btn" onclick="this.closest('.quick-view-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="quick-view-grid">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                
                <div class="quick-view-info">
                    <h2>${product.name}</h2>
                    <div class="product-rating" style="margin: 1rem 0;">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span style="color: var(--text-muted); margin-left: 0.5rem;">4.5 (128 reviews)</span>
                    </div>
                    
                    <p class="product-description" style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
                        ${product.description || 'Premium quality product with advanced features and excellent performance. Perfect for your needs.'}
                    </p>
                    
                    <div class="price-section" style="margin: 2rem 0;">
                        <div class="product-price" style="font-size: 2rem;">$${product.price.toFixed(2)}</div>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">
                            <i class="fas fa-check-circle" style="color: #6EE7B7;"></i> In Stock
                        </p>
                    </div>
                    
                    <div class="quantity-selector" style="margin: 1.5rem 0;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Quantity:</label>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button class="qty-btn" onclick="updateModalQuantity(-1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span id="modalQuantity" style="font-size: 1.2rem; font-weight: 600; min-width: 30px; text-align: center;">1</span>
                            <button class="qty-btn" onclick="updateModalQuantity(1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="quick-view-actions" style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-accent btn-lg" onclick="addToCartFromQuickView(${product.id})" style="flex: 1;">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="btn btn-glass" onclick="addToWishlistFromQuickView(${product.id})">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    
                    <div class="product-meta" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--glass-border);">
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">
                            <i class="fas fa-shipping-fast"></i> Free shipping on orders over $50
                        </p>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">
                            <i class="fas fa-undo"></i> 30-day return policy
                        </p>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">
                            <i class="fas fa-shield-alt"></i> 1-year warranty included
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add styles for quick view
    if (!document.getElementById('quickViewStyles')) {
        const style = document.createElement('style');
        style.id = 'quickViewStyles';
        style.textContent = `
            .quick-view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 2rem;
            }
            .quick-view-modal.show {
                opacity: 1;
            }
            .quick-view-content {
                background: var(--glass-bg-strong);
                backdrop-filter: blur(30px);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                max-width: 1000px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 2rem;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            .quick-view-modal.show .quick-view-content {
                transform: scale(1);
            }
            .close-modal-btn {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                transition: var(--transition-base);
            }
            .close-modal-btn:hover {
                background: var(--gradient-danger);
                transform: rotate(90deg);
            }
            .quick-view-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
            }
            .quick-view-image {
                border-radius: var(--radius-md);
                overflow: hidden;
                background: var(--glass-bg);
            }
            .quick-view-image img {
                width: 100%;
                height: 400px;
                object-fit: cover;
            }
            .quick-view-info h2 {
                font-size: 2rem;
                margin-bottom: 1rem;
                font-family: var(--font-display);
            }
            @media (max-width: 768px) {
                .quick-view-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                .quick-view-image img {
                    height: 250px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    return modal;
}

let modalQuantity = 1;

function updateModalQuantity(change) {
    modalQuantity = Math.max(1, modalQuantity + change);
    document.getElementById('modalQuantity').textContent = modalQuantity;
}

function addToCartFromQuickView(productId) {
    // Find product and add to cart with modal quantity
    const product = {
        id: productId,
        quantity: modalQuantity
    };

    // Get product details from page
    const cards = document.querySelectorAll('.product-card');
    const card = cards[productId - 1];
    if (card) {
        const fullProduct = extractProductFromCard(card, productId);
        fullProduct.quantity = modalQuantity;
        addToCart(fullProduct);

        // Close modal
        document.querySelector('.quick-view-modal').remove();
        modalQuantity = 1;
    }
}

function addToWishlistFromQuickView(productId) {
    const cards = document.querySelectorAll('.product-card');
    const card = cards[productId - 1];
    if (card) {
        const product = extractProductFromCard(card, productId);
        const wishlistBtn = card.querySelector('.action-btn[title="Add to Wishlist"]');
        toggleWishlist(product, wishlistBtn);
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function () {
    initWishlist();
    initQuickView();
});

// Export functions for use in other files
window.toggleWishlist = toggleWishlist;
window.showQuickView = showQuickView;
window.updateModalQuantity = updateModalQuantity;
window.addToCartFromQuickView = addToCartFromQuickView;
window.addToWishlistFromQuickView = addToWishlistFromQuickView;
