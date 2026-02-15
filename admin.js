
// Logout function
function logout() {
    localStorage.removeItem('electro_current_user');
    window.location.href = 'login.html';
}

// Sample Data - Replace with actual data from localStorage or API
let orders = JSON.parse(localStorage.getItem('orders')) || [
    { id: 1, customer: 'أحمد محمد', phone: '07701234567', total: 45000, status: 'delivered', date: '2025-12-20', items: [{ name: 'Satelite Receiver 4k', qty: 2, price: 15000 }, { name: 'HDMI Cable', qty: 1, price: 15000 }] },
    { id: 2, customer: 'سارة علي', phone: '07709876543', total: 65000, status: 'processing', date: '2025-12-22', items: [{ name: 'Smart Remote', qty: 3, price: 18000 }, { name: 'Wall Mount', qty: 2, price: 14500 }] },
    { id: 3, customer: 'محمود حسن', phone: '07701112233', total: 35000, status: 'pending', date: '2025-12-25', items: [{ name: 'LNB Dual', qty: 2, price: 12000 }, { name: 'Coaxial Cable 20m', qty: 1, price: 11000 }] },
    { id: 4, customer: 'فاطمة خالد', phone: '07704445566', total: 85000, status: 'delivered', date: '2025-12-24', items: [{ name: 'Android TV Box', qty: 4, price: 20000 }, { name: 'WiFi Adapter', qty: 3, price: 15000 }] },
    { id: 5, customer: 'عمر يوسف', phone: '07707778899', total: 25000, status: 'cancelled', date: '2025-12-23', items: [{ name: 'Signal Finder', qty: 5, price: 5000 }] }
];

let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'StarLink Pro Receiver', price: 199000, category: 'satellite', stock: 50, image: 'https://images.unsplash.com/photo-1544869829-1702f232e08c' },
    { id: 2, name: 'Orbital Dish 500', price: 149000, category: 'satellite', stock: 45, image: 'https://images.unsplash.com/photo-1521303833507-6f0a349c24e9' },
    { id: 3, name: 'Signal Booster X1', price: 89000, category: 'satellite', stock: 60, image: 'https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa5' },
    { id: 4, name: 'UltraView 8K Smart TV', price: 2499000, category: 'tv', stock: 30, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1' },
    { id: 5, name: 'Universal Touch Remote', price: 59000, category: 'accessories', stock: 25, image: 'https://plus.unsplash.com/premium_photo-1683121588663-d1df5bf51db9' }
];

let customers = JSON.parse(localStorage.getItem('customers')) || [
    { id: 1, name: 'أحمد محمد', phone: '07701234567', email: 'ahmed@example.com', orders: 5, totalSpent: 225000, joinDate: '2025-11-15' },
    { id: 2, name: 'سارة علي', phone: '07709876543', email: 'sara@example.com', orders: 3, totalSpent: 195000, joinDate: '2025-12-01' },
    { id: 3, name: 'محمود حسن', phone: '07701112233', email: 'mahmoud@example.com', orders: 2, totalSpent: 70000, joinDate: '2025-12-10' },
    { id: 4, name: 'فاطمة خالد', phone: '07704445566', email: 'fatima@example.com', orders: 4, totalSpent: 340000, joinDate: '2025-11-20' }
];

// Initialize Dashboard
function initDashboard() {
    updateStatistics();
    renderRecentOrders();
    renderOrdersTable();
    renderProductsTable();
    renderCustomersTable();
    renderMessagesTable();
}

// Update Statistics
function updateStatistics() {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.status !== 'cancelled' ? order.total : 0), 0);
    const totalCustomers = customers.length;
    const totalProducts = products.length;

    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString();
    document.getElementById('totalCustomers').textContent = totalCustomers;
    document.getElementById('totalProducts').textContent = totalProducts;
}

// Render Recent Orders (Dashboard)
function renderRecentOrders() {
    const recentOrders = orders.slice(0, 5);
    const html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>رقم الطلب</th>
                    <th>العميل</th>
                    <th>الهاتف</th>
                    <th>المبلغ</th>
                    <th>الحالة</th>
                    <th>التاريخ</th>
                    <th>الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                ${recentOrders.length ? recentOrders.map(order => `
                    <tr>
                        <td><strong>#${order.id}</strong></td>
                        <td>${order.customer}</td>
                        <td>${order.phone}</td>
                        <td><strong>${order.total.toLocaleString()} IQD</strong></td>
                        <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                        <td>${order.date}</td>
                        <td>
                            <div class="action-btns">
                                <button class="action-btn view" onclick="viewOrder(${order.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('') : '<tr><td colspan="7"><div class="empty-state"><i class="fas fa-inbox"></i><h3>لا توجد طلبات</h3></div></td></tr>'}
            </tbody>
        </table>
    `;
    const container = document.getElementById('recentOrdersTable');
    if (container) container.innerHTML = html;
}

// Render Orders Table
function renderOrdersTable() {
    const html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>رقم الطلب</th>
                    <th>العميل</th>
                    <th>الهاتف</th>
                    <th>المبلغ</th>
                    <th>الحالة</th>
                    <th>التاريخ</th>
                    <th>الإجراءات</th>
                </tr>
            </thead>
            <tbody id="ordersTableBody">
                ${orders.length ? orders.map(order => `
                    <tr data-order-id="${order.id}" data-status="${order.status}">
                        <td><strong>#${order.id}</strong></td>
                        <td>${order.customer}</td>
                        <td>${order.phone}</td>
                        <td><strong>${order.total.toLocaleString()} IQD</strong></td>
                        <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                        <td>${order.date}</td>
                        <td>
                            <div class="action-btns">
                                <button class="action-btn view" onclick="viewOrder(${order.id})" title="عرض التفاصيل">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="action-btn edit" onclick="updateOrderStatus(${order.id})" title="تحديث الحالة">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn delete" onclick="deleteOrder(${order.id})" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('') : '<tr><td colspan="7"><div class="empty-state"><i class="fas fa-inbox"></i><h3>لا توجد طلبات</h3></div></td></tr>'}
            </tbody>
        </table>
    `;
    const container = document.getElementById('ordersTable');
    if (container) container.innerHTML = html;
}

// Render Products Table
function renderProductsTable() {
    const html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>المعرف</th>
                    <th>اسم المنتج</th>
                    <th>الفئة</th>
                    <th>السعر</th>
                    <th>المخزون</th>
                    <th>الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                ${products.length ? products.map(product => `
                    <tr>
                        <td><strong>#${product.id}</strong></td>
                        <td>${product.name}</td>
                        <td>${getCategoryText(product.category)}</td>
                        <td><strong>${product.price.toLocaleString()} IQD</strong></td>
                        <td>${product.stock}</td>
                        <td>
                            <div class="action-btns">
                                <button class="action-btn edit" onclick="editProduct(${product.id})" title="تعديل">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('') : '<tr><td colspan="6"><div class="empty-state"><i class="fas fa-box-open"></i><h3>لا توجد منتجات</h3></div></td></tr>'}
            </tbody>
        </table>
    `;
    const container = document.getElementById('productsTable');
    if (container) container.innerHTML = html;
}

// Render Customers Table
function renderCustomersTable() {
    const html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>المعرف</th>
                    <th>الاسم</th>
                    <th>الهاتف</th>
                    <th>البريد الإلكتروني</th>
                    <th>عدد الطلبات</th>
                    <th>الإنفاق الكلي</th>
                    <th>تاريخ الانضمام</th>
                </tr>
            </thead>
            <tbody id="customersTableBody">
                ${customers.length ? customers.map(customer => `
                    <tr data-customer-name="${customer.name}">
                        <td><strong>#${customer.id}</strong></td>
                        <td>${customer.name}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.email}</td>
                        <td>${customer.orders}</td>
                        <td><strong>${customer.totalSpent.toLocaleString()} IQD</strong></td>
                        <td>${customer.joinDate}</td>
                    </tr>
                `).join('') : '<tr><td colspan="7"><div class="empty-state"><i class="fas fa-user-slash"></i><h3>لا يوجد عملاء</h3></div></td></tr>'}
            </tbody>
        </table>
    `;
    const container = document.getElementById('customersTable');
    if (container) container.innerHTML = html;
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('data-section')) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    const titles = {
        dashboard: 'لوحة المعلومات',
        orders: 'إدارة الطلبات',
        products: 'إدارة المنتجات',
        customers: 'قاعدة العملاء',
        messages: 'رسائل التواصل'
    };
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.textContent = titles[sectionId];
}

// Modals
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const itemsHtml = order.items.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <div>
                <strong>${item.name}</strong>
                <div style="color: var(--text-muted); font-size: 14px;">الكمية: ${item.qty}</div>
            </div>
            <div><strong>${(item.price * item.qty).toLocaleString()} IQD</strong></div>
        </div>
    `).join('');

    const detailsHtml = `
        <div style="margin-bottom: 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-bottom: 5px;">رقم الطلب</div>
                    <strong>#${order.id}</strong>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-bottom: 5px;">التاريخ</div>
                    <strong>${order.date}</strong>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-bottom: 5px;">العميل</div>
                    <strong>${order.customer}</strong>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-bottom: 5px;">الهاتف</div>
                    <strong>${order.phone}</strong>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-bottom: 5px;">الحالة</div>
                    <span class="status-badge status-${order.status}">${getStatusText(order.status)}</span>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-bottom: 5px;">الإجمالي</div>
                    <strong style="color: var(--accent-color); font-size: 18px;">${order.total.toLocaleString()} IQD</strong>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h3 style="margin-bottom: 15px; color: var(--text-color);">تفاصيل الطلب</h3>
            ${itemsHtml}
        </div>
    `;

    document.getElementById('orderDetails').innerHTML = detailsHtml;
    document.getElementById('orderModal').classList.add('active');
}

function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const statuses = ['pending', 'processing', 'delivered', 'cancelled'];
    const statusTexts = ['قيد الانتظار', 'قيد المعالجة', 'تم التسليم', 'ملغي'];

    const currentIndex = statuses.indexOf(order.status);
    const nextIndex = (currentIndex + 1) % statuses.length;

    order.status = statuses[nextIndex];
    localStorage.setItem('orders', JSON.stringify(orders));

    renderOrdersTable();
    renderRecentOrders();
    showToast(`تم تحديث حالة الطلب إلى: ${statusTexts[nextIndex]}`);
}

function deleteOrder(orderId) {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));

    renderOrdersTable();
    renderRecentOrders();
    updateStatistics();
    showToast('تم حذف الطلب بنجاح');
}

function filterOrders() {
    const searchTerm = document.getElementById('searchOrders').value.toLowerCase();
    const rows = document.querySelectorAll('#ordersTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterOrdersByStatus(status) {
    const rows = document.querySelectorAll('#ordersTableBody tr');

    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
        } else {
            const orderStatus = row.getAttribute('data-status');
            row.style.display = orderStatus === status ? '' : 'none';
        }
    });
}

// Products Management
function openAddProductModal() {
    document.getElementById('productModalTitle').textContent = 'إضافة منتج جديد';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModal').classList.add('active');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('productModalTitle').textContent = 'تعديل المنتج';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productImage').value = product.image || '';
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productModal').classList.add('active');
}

function saveProduct(e) {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        price: parseInt(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        stock: parseInt(document.getElementById('productStock').value)
    };

    if (productId) {
        // Update existing product
        const index = products.findIndex(p => p.id === parseInt(productId));
        products[index] = { ...products[index], ...productData };
        showToast('تم تحديث المنتج بنجاح');
    } else {
        // Add new product
        const newProduct = {
            id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...productData
        };
        products.push(newProduct);
        showToast('تم إضافة المنتج بنجاح');
    }

    localStorage.setItem('products', JSON.stringify(products));
    renderProductsTable();
    updateStatistics();
    closeModal('productModal');
}

function deleteProduct(productId) {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    products = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));

    renderProductsTable();
    updateStatistics();
    showToast('تم حذف المنتج بنجاح');
}

// Customers Management
function filterCustomers() {
    const searchTerm = document.getElementById('searchCustomers').value.toLowerCase();
    const rows = document.querySelectorAll('#customersTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Utilities
function getStatusText(status) {
    const statuses = {
        pending: 'قيد الانتظار',
        processing: 'قيد المعالجة',
        delivered: 'تم التسليم',
        cancelled: 'ملغي'
    };
    return statuses[status] || status;
}

function getCategoryText(category) {
    const categories = {
        satellite: 'ستلايت',
        tv: 'شاشات',
        accessories: 'ملحقات',
        coffee: 'قهوة',
        tea: 'شاي',
        dessert: 'حلويات',
        other: 'أخرى'
    };
    return categories[category] || category;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function exportData() {
    const data = {
        orders: orders,
        products: products,
        customers: customers,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    showToast('تم تصدير البيانات بنجاح');
}

function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        window.location.href = 'index.html';
    }
}

// Close modal on outside click
window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Contact Messages Management
function renderMessagesTable() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>الحالة</th>
                    <th>الرسالة</th>
                    <th>الموضوع</th>
                    <th>البريد</th>
                    <th>الاسم</th>
                    <th>التاريخ</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody id="messagesTableBody">
                ${messages.length ? messages.map(msg => `
                    <tr data-message-id="${msg.id}" data-status="${msg.status}">
                        <td>
                            <button class="btn ${msg.status === 'unread' ? 'btn-primary' : 'btn-secondary'}" 
                                    onclick="toggleMessageStatus(${msg.id})" 
                                    style="padding: 5px 12px; font-size: 11px;">
                                ${msg.status === 'unread' ? 'جديد' : 'مقروء'}
                            </button>
                        </td>
                        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" 
                            title="${msg.message}">
                            ${msg.message}
                        </td>
                        <td>${msg.subject}</td>
                        <td>${msg.email}</td>
                        <td><strong>${msg.name}</strong></td>
                        <td>${new Date(msg.date).toLocaleDateString('ar-IQ')}</td>
                        <td><strong>#${msg.id}</strong></td>
                    </tr>
                `).join('') : '<tr><td colspan="7"><div class="empty-state"><i class="fas fa-inbox"></i><h3>لا توجد رسائل</h3></div></td></tr>'}
            </tbody>
        </table>
    `;
    const container = document.getElementById('messages');
    if (container) {
        const tableContainer = container.querySelector('.data-card');
        if (tableContainer) {
            const existingTable = tableContainer.querySelector('table');
            if (existingTable) {
                existingTable.outerHTML = html;
            }
        }
    }
}

function toggleMessageStatus(messageId) {
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const message = messages.find(m => m.id === messageId);
    if (message) {
        message.status = message.status === 'unread' ? 'read' : 'unread';
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        renderMessagesTable();
        showToast(message.status === 'read' ? 'تم تحديد الرسالة كمقروءة' : 'تم تحديد الرسالة كغير مقروءة');
    }
}

function clearAllMessages() {
    if (!confirm('هل أنت متأكد من حذف جميع الرسائل؟')) return;
    localStorage.setItem('contactMessages', JSON.stringify([]));
    renderMessagesTable();
    showToast('تم حذف جميع الرسائل');
}

function filterMessages() {
    const searchTerm = document.getElementById('searchMessages').value.toLowerCase();
    const rows = document.querySelectorAll('#messagesTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Add search event listener if element exists
const searchMessagesInput = document.getElementById('searchMessages');
if (searchMessagesInput) {
    searchMessagesInput.addEventListener('input', filterMessages);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initDashboard);
