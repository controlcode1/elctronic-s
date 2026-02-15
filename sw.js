const CACHE_NAME = 'electro-tech-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/index.css',
    '/script.js',
    '/login.html',
    '/signup.html',
    '/contact.html',
    '/admin.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS);
            })
    );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                return response || fetch(e.request);
            })
    );
});
