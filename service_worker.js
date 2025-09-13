const CACHE_NAME = 'italy-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/amalfi-coast.jpg',
  '/spanish-steps.jpg',
  '/colosseum.jpg',
  '/gnocchi-alla-sorrentina.jpg',
  '/vatican.jpg',
  '/pompeii.jpg',
  '/capri.jpg',
  '/Naples.jpg',
  '/neapolitan-pizza.jpg',
  '/fresh-seafood.jpg',
  '/limoncello.jpg',
  '/site.webmanifest',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install event: caches all the essential assets.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached assets when offline.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found, otherwise fetch from the network.
        return response || fetch(event.request);
      })
  );
});

// Activate event: deletes old caches to free up storage.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
