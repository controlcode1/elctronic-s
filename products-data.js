// ============================================
// PRODUCT DATA - Central Source of Truth
// ============================================

const PRODUCTS = [
    {
        id: 1,
        title: "UltraView 8K Smart TV",
        titleAr: "شاشة ألترافيو 8K الذكية",
        price: 2499,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
        category: "tv-audio",
        description: "Experience cinema-quality viewing with stunning 8K resolution and smart features.",
        descriptionAr: "استمتع بمشاهدة بجودة السينما مع دقة 8K المذهلة والميزات الذكية.",
        stock: 30,
        rating: 4.8,
        colors: ["#1F2937", "#64748B", "#F8FAFC"],
        label: "hot",
        discount: 0
    },
    {
        id: 2,
        title: "StarLink Pro 4K Receiver",
        titleAr: "رسيفر ستارلينك برو 4K",
        price: 199,
        image: "https://images.unsplash.com/photo-1544869829-1702f232e08c?w=500",
        category: "satellite",
        description: "Advanced satellite receiver with 4K output and premium channel support.",
        descriptionAr: "رسيفر ستلايت متطور بخرج 4K ودعم القنوات المميزة.",
        stock: 50,
        rating: 4.5,
        colors: ["#000000", "#DC2626"],
        label: "new",
        discount: 0
    },
    {
        id: 3,
        title: "Universal Smart Remote",
        titleAr: "ريموت ذكي شامل",
        price: 59,
        image: "https://plus.unsplash.com/premium_photo-1683121588663-d1df5bf51db9?w=500",
        category: "remote",
        description: "Control all your devices with one intuitive smart remote.",
        descriptionAr: "تحكم بجميع أجهزتك بريموت ذكي واحد وسهل الاستخدام.",
        stock: 100,
        rating: 4.2,
        colors: ["#000000", "#F8FAFC", "#6366F1"],
        label: "sale",
        discount: 15
    },
    {
        id: 4,
        title: "Orbital Dish 500",
        titleAr: "طبق أوربيتال 500",
        price: 149,
        image: "https://images.unsplash.com/photo-1521303833507-6f0a349c24e9?w=500",
        category: "satellite",
        description: "High-performance satellite dish with wide coverage and signal stability.",
        descriptionAr: "طبق ستلايت عالي الأداء بتغطية واسعة واستقرار إشارة.",
        stock: 45,
        rating: 4.6,
        colors: ["#9CA3AF", "#F8FAFC"],
        label: null,
        discount: 0
    },
    {
        id: 5,
        title: "Signal Booster X1",
        titleAr: "مقوي إشارة X1",
        price: 89,
        image: "https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa5?w=500",
        category: "satellite",
        description: "Boost your satellite signal for crystal-clear reception.",
        descriptionAr: "قوّي إشارة الستلايت للحصول على استقبال واضح ونقي.",
        stock: 60,
        rating: 4.3,
        colors: ["#1F2937", "#059669"],
        label: null,
        discount: 0
    },
    {
        id: 6,
        title: "Soundbar Pro 300W",
        titleAr: "ساوند بار برو 300 واط",
        price: 349,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500",
        category: "tv-audio",
        description: "Immersive surround sound with 300W power and wireless subwoofer.",
        descriptionAr: "صوت محيطي غامر بقوة 300 واط وسبووفر لاسلكي.",
        stock: 35,
        rating: 4.7,
        colors: ["#000000", "#64748B"],
        label: "hot",
        discount: 0
    },
    {
        id: 7,
        title: "HDMI 2.1 Cable 3m",
        titleAr: "كيبل HDMI 2.1 بطول 3 متر",
        price: 29,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
        category: "accessories",
        description: "High-speed HDMI 2.1 cable supporting 8K and 120Hz.",
        descriptionAr: "كيبل HDMI 2.1 عالي السرعة يدعم 8K و 120Hz.",
        stock: 200,
        rating: 4.4,
        colors: ["#000000", "#F8FAFC", "#DC2626", "#059669"],
        label: "sale",
        discount: 20
    },
    {
        id: 8,
        title: "Wall Mount Bracket",
        titleAr: "حامل شاشة جداري",
        price: 45,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500",
        category: "accessories",
        description: "Universal wall mount bracket for 32-75 inch TVs with tilt and swivel.",
        descriptionAr: "حامل جداري شامل لشاشات 32-75 إنش مع ميلان ودوران.",
        stock: 80,
        rating: 4.1,
        colors: ["#1F2937", "#9CA3AF"],
        label: null,
        discount: 0
    },
    {
        id: 9,
        title: "Android TV Box Pro",
        titleAr: "أندرويد TV بوكس برو",
        price: 129,
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236571?w=500",
        category: "tv-audio",
        description: "Transform any TV into a smart TV with our powerful Android box.",
        descriptionAr: "حوّل أي شاشة إلى شاشة ذكية مع بوكس الأندرويد القوي.",
        stock: 55,
        rating: 4.5,
        colors: ["#000000", "#F8FAFC", "#6366F1"],
        label: "new",
        discount: 0
    },
    {
        id: 10,
        title: "LNB Dual Output",
        titleAr: "LNB مخرجين",
        price: 35,
        image: "https://images.unsplash.com/photo-1622127922040-13cab637ee78?w=500",
        category: "satellite",
        description: "High-quality dual-output LNB for connecting two receivers.",
        descriptionAr: "LNB عالي الجودة بمخرجين لتوصيل رسيفرين.",
        stock: 120,
        rating: 3.9,
        colors: ["#9CA3AF"],
        label: "sale",
        discount: 10
    }
];

// Category definitions
const CATEGORIES = [
    { id: "all", label: "All Products", labelAr: "كل المنتجات" },
    { id: "satellite", label: "Satellite", labelAr: "ستلايت" },
    { id: "tv-audio", label: "TV & Audio", labelAr: "شاشات وصوتيات" },
    { id: "accessories", label: "Accessories", labelAr: "ملحقات" },
    { id: "remote", label: "Remotes", labelAr: "ريموتات" }
];

// Make globally available
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
