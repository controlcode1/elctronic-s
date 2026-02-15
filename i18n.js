// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================

const TRANSLATIONS = {
    en: {
        // Navigation
        home: "Home",
        products: "Products",
        contact: "Contact",
        admin: "Admin",
        login: "Login",
        signup: "Sign Up",
        logout: "Logout",

        // Hero
        heroTitle1: "Premium Electronics",
        heroTitle2: "For Modern Living",
        heroDesc: "Discover cutting-edge technology and premium electronics. Bold design meets powerful performance.",
        shopNow: "Shop Now",
        viewCategories: "View Categories",
        trendingNow: "Trending This Week",
        productsAvailable: "Products",
        customerRating: "Rating",
        from: "From",

        // Features
        freeShipping: "Free Shipping",
        freeShippingDesc: "On orders over $100",
        support247: "24/7 Support",
        support247Desc: "Always here to help",
        securePayment: "Secure Payment",
        securePaymentDesc: "100% protected",
        easyReturns: "Easy Returns",
        easyReturnsDesc: "30-day return policy",

        watchDemo: "WATCH DEMO",

        // Categories & Sections
        browseByCategory: "Browse by Category",
        tvAudio: "TV & Audio",
        remotes: "Remotes",
        exploreProducts: "Explore our Products",
        ourProducts: "Our Products",
        curatedForYou: "Curated for You",
        viewAllProducts: "View All Products",

        // Promo
        specialOffer: "Special Offer",
        promoTitle: "Enhance Your Entertainment Experience",
        checkItOut: "Check it Out",
        days: "Days",
        hours: "Hrs",
        minutes: "Min",
        seconds: "Sec",

        // Products section
        featuredProducts: "FEATURED PRODUCTS",
        productsSubtitle: "Explore our carefully curated collection of premium electronics",
        viewAll: "VIEW ALL PRODUCTS",
        addToCart: "ADD",
        allProducts: "All Products",
        noResults: "No products found matching your search.",

        // Cart
        shoppingCart: "Shopping Cart",
        cartEmpty: "Your cart is empty",
        total: "Total:",
        checkout: "Proceed to Checkout",
        itemAdded: "added to cart!",
        itemRemoved: "Item removed from cart",
        quantityUpdated: "quantity updated",
        cartEmptyMsg: "Your cart is empty!",
        checkoutSoon: "Checkout feature coming soon!",

        // Search
        searchPlaceholder: "Search products...",
        searchResults: "Search Results",
        noSearchResults: "No products found.",

        // CTA
        readyUpgrade: "READY TO UPGRADE?",
        ctaDesc: "Join thousands of satisfied customers and experience the future of electronics today",
        startShopping: "START SHOPPING",
        contactSales: "CONTACT SALES",

        // Footer
        footerDesc: "Your trusted partner for premium electronics and cutting-edge technology.",
        quickLinks: "QUICK LINKS",
        contactInfo: "CONTACT",
        followUs: "FOLLOW US",
        copyright: "© 2025 ElectroTech. All rights reserved.",

        // Auth page
        welcomeBack: "Welcome Back",
        signInDesc: "Sign in to continue to your account",
        startForFree: "START FOR FREE",
        signInTitle: "Sign in to your account",
        backToHome: "Back to Home",
        demoCredentials: "Demo: admin@electrotech.com / admin123",
        emailOrPhoneLabel: "Email or Phone Number",
        emailOrPhone: "Email or Phone Number",

        emailOrPhonePlaceholder: "Enter your email or phone",
        password: "Password",
        signIn: "Sign In",
        orContinueWith: "or continue with",
        noAccount: "Don't have an account?",
        createAccount: "Create Account",
        joinDesc: "Join the future of electronics shopping",
        fullName: "Full Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        haveAccount: "Already have an account?",
        orSignUpWith: "or sign up with",
        loginError: "Invalid credentials. Please try again.",
        loginSuccess: "Login successful!",

        // Contact
        getInTouch: "Get In Touch",
        contactDesc: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        yourName: "Full Name",
        yourEmail: "Email Address",
        subject: "Subject",
        message: "Message",
        sendMessage: "Send Message",
        contactInformation: "Contact Information",
        sendUsMessage: "Send us a Message",
        phone: "Phone",
        email: "Email",
        location: "Location",
        businessHours: "Business Hours",
        businessHoursValue: "Mon - Fri: 9AM - 6PM",
        messageSent: "Message sent successfully! We'll get back to you soon.",
        fillAllFields: "Please fill in all fields",
        invalidEmail: "Please enter a valid email address",
        messageError: "Error sending message. Please try again.",
        namePlaceholder: "John Doe",
        emailPlaceholder: "john@example.com",
        subjectPlaceholder: "How can we help?",
        messagePlaceholder: "Your message here...",

        // Checkout Page
        checkoutTitle: "Complete Your Order",
        checkoutSubtitle: "Fill in your information to finalize the purchase",
        customerInfo: "Customer Information",
        address: "Delivery Address",
        addressPlaceholder: "Enter your complete delivery address",
        orderNotes: "Order Notes (Optional)",
        notesPlaceholder: "Any special instructions?",
        cartSummary: "Cart Summary",
        subtotal: "Subtotal",
        total: "Total",
        proceedCheckout: "PROCEED TO CHECKOUT",

        // Newsletter
        newsletterTitle: "Ready to Get Our New Stuff?",
        newsletterDesc: "Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and tech insights.",
        subscribe: "SUBSCRIBE",

        backToCart: "Edit Cart",
        placeOrder: "Place Order",
        orderPlaced: "Order Placed Successfully!",
        orderConfirmation: "Thank you for your purchase. We'll send you a confirmation email shortly.",
        continueShop: "Continue Shopping",

        // Language
        langToggle: "عربي"
    },
    ar: {
        // Navigation
        home: "الرئيسية",
        products: "المنتجات",
        contact: "تواصل معنا",
        admin: "لوحة التحكم",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        logout: "تسجيل الخروج",

        // Hero
        heroTitle1: "إلكترونيات فاخرة",
        heroTitle2: "لحياة عصرية",
        heroDesc: "اكتشف أحدث التقنيات والإلكترونيات المميزة. تصميم عصري يلتقي بالأداء القوي.",
        shopNow: "تسوق الآن",
        viewCategories: "تصفح الفئات",
        trendingNow: "الأكثر رواجاً هذا الأسبوع",
        productsAvailable: "منتج",
        customerRating: "تقييم",
        from: "من",

        // Features
        freeShipping: "شحن مجاني",
        freeShippingDesc: "للطلبات فوق $100",
        support247: "دعم 24/7",
        support247Desc: "دائماً هنا لمساعدتك",
        securePayment: "دفع آمن",
        securePaymentDesc: "محمي 100%",
        easyReturns: "إرجاع سهل",
        easyReturnsDesc: "سياسة إرجاع لمدة 30 يوماً",

        watchDemo: "شاهد العرض",

        // Categories & Sections
        browseByCategory: "تصفح حسب الفئة",
        tvAudio: "شاشات وصوتيات",
        remotes: "ريموتات",
        exploreProducts: "استكشف منتجاتنا",
        ourProducts: "منتجاتنا",
        curatedForYou: "مختار لك",
        viewAllProducts: "عرض كل المنتجات",

        // Promo
        specialOffer: "عرض خاص",
        promoTitle: "عزز تجربة الترفيه الخاصة بك",
        checkItOut: "تحقق من العرض",
        days: "يوم",
        hours: "ساعة",
        minutes: "دقيقة",
        seconds: "ثانية",

        // Products section
        featuredProducts: "المنتجات المميزة",
        productsSubtitle: "استكشف مجموعتنا المختارة بعناية من الإلكترونيات المميزة",
        viewAll: "عرض كل المنتجات",
        addToCart: "أضف",
        allProducts: "كل المنتجات",
        noResults: "لا توجد منتجات مطابقة للبحث.",

        // Cart
        shoppingCart: "سلة التسوق",
        cartEmpty: "سلة التسوق فارغة",
        total: "المجموع:",
        checkout: "إتمام الشراء",
        itemAdded: "تمت الإضافة للسلة!",
        itemRemoved: "تم حذف العنصر من السلة",
        quantityUpdated: "تم تحديث الكمية",
        cartEmptyMsg: "سلة التسوق فارغة!",
        checkoutSoon: "ميزة الدفع قريباً!",

        // Search
        searchPlaceholder: "ابحث عن منتجات...",
        searchResults: "نتائج البحث",
        noSearchResults: "لا توجد منتجات.",

        // CTA
        readyUpgrade: "مستعد للترقية؟",
        ctaDesc: "انضم لآلاف العملاء الراضين واستمتع بمستقبل الإلكترونيات اليوم",
        startShopping: "ابدأ التسوق",
        contactSales: "تواصل مع المبيعات",

        // Footer
        footerDesc: "شريكك الموثوق للإلكترونيات المميزة والتقنيات المتطورة.",
        quickLinks: "روابط سريعة",
        contactInfo: "التواصل",
        followUs: "تابعنا",
        copyright: "© 2025 إلكتروتك. جميع الحقوق محفوظة.",

        // Auth page
        welcomeBack: "مرحباً بعودتك",
        signInDesc: "سجّل الدخول للمتابعة إلى حسابك",
        startForFree: "ابدأ مجاناً",
        signInTitle: "تسجيل الدخول إلى حسابك",
        backToHome: "العودة للرئيسية",
        demoCredentials: "تجريبي: admin@electrotech.com / admin123",
        emailOrPhoneLabel: "البريد الإلكتروني أو رقم الهاتف",
        emailOrPhone: "البريد الإلكتروني أو رقم الهاتف",

        emailOrPhonePlaceholder: "أدخل بريدك الإلكتروني أو رقم الهاتف",
        password: "كلمة المرور",
        signIn: "تسجيل الدخول",
        orContinueWith: "أو سجّل الدخول عبر",
        noAccount: "ليس لديك حساب؟",
        createAccount: "إنشاء حساب",
        joinDesc: "انضم لمستقبل التسوق الإلكتروني",
        fullName: "الاسم الكامل",
        emailAddress: "البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        haveAccount: "لديك حساب بالفعل؟",
        orSignUpWith: "أو أنشئ حساب عبر",
        loginError: "بيانات الدخول غير صحيحة. حاول مرة أخرى.",
        loginSuccess: "تم تسجيل الدخول بنجاح!",

        // Contact
        getInTouch: "تواصل معنا",
        contactDesc: "يسعدنا سماعك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
        yourName: "الاسم الكامل",
        yourEmail: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        sendMessage: "إرسال الرسالة",
        contactInformation: "معلومات الاتصال",
        sendUsMessage: "أرسل لنا رسالة",
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        location: "الموقع",
        businessHours: "ساعات العمل",
        businessHoursValue: "الإثنين - الجمعة: 9 صباحاً - 6 مساءً",
        messageSent: "تم إرسال الرسالة بنجاح! سنرد عليك قريباً.",
        fillAllFields: "يرجى ملء جميع الحقول",
        invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
        messageError: "خطأ في إرسال الرسالة. حاول مرة أخرى.",
        namePlaceholder: "أحمد محمد",
        emailPlaceholder: "ahmed@example.com",
        subjectPlaceholder: "كيف يمكننا مساعدتك؟",
        messagePlaceholder: "اكتب رسالتك هنا...",

        // Checkout Page
        checkoutTitle: "إتمام الطلب",
        checkoutSubtitle: "املأ معلوماتك لإنهاء عملية الشراء",
        customerInfo: "معلومات العميل",
        address: "عنوان التوصيل",
        addressPlaceholder: "أدخل عنوان التوصيل الكامل",
        orderNotes: "ملاحظات الطلب (اختياري)",
        notesPlaceholder: "أي تعليمات خاصة؟",
        orderSummary: "ملخص الطلب",
        cartSummary: "ملخص السلة",
        subtotal: "المجموع الفرعي",
        total: "المجموع",
        proceedCheckout: "المتابعة للدفع",

        // Newsletter
        newsletterTitle: "جاهز للجديد؟",
        newsletterDesc: "اشترك في نشرتنا الإخبارية وكن أول من يعلم بالعروض الحصرية والمنتجات الجديدة.",
        subscribe: "اشترك",

        backToCart: "تعديل السلة",
        placeOrder: "تأكيد الطلب",
        orderPlaced: "تم تقديم الطلب بنجاح!",
        orderConfirmation: "شكراً لك على الشراء. سنرسل لك رسالة تأكيد قريباً.",
        continueShop: "متابعة التسوق",

        // Language
        langToggle: "English"
    }
};

// ============================================
// i18n ENGINE
// ============================================

function getLanguage() {
    return localStorage.getItem('electrotech_lang') || 'en';
}

function setLanguage(lang) {
    localStorage.setItem('electrotech_lang', lang);
    applyLanguage(lang);
}

function toggleLanguage() {
    const current = getLanguage();
    const next = current === 'en' ? 'ar' : 'en';
    setLanguage(next);
}

function applyLanguage(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    // Set dir and lang on html element
    const html = document.documentElement;
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', lang);

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update all data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.setAttribute('placeholder', t[key]);
        }
    });

    // Update language toggle button text
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        const span = langBtn.querySelector('span');
        if (span) span.textContent = t.langToggle;
    }

    // Rebuild dynamic content if builders exist
    if (typeof buildProductCards === 'function') {
        buildProductCards();
    }
    if (typeof renderCartItems === 'function' && document.getElementById('cartItems')) {
        renderCartItems();
    }
}

// Initialize language on page load
function initI18n() {
    const lang = getLanguage();
    applyLanguage(lang);
}

// Make globally available
window.TRANSLATIONS = TRANSLATIONS;
window.getLanguage = getLanguage;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.applyLanguage = applyLanguage;
window.initI18n = initI18n;
window.t = function(key) {
    const lang = getLanguage();
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
};
