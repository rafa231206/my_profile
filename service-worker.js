const CACHE_NAME = 'profile-card-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/img/quality_restoration_20250330050655089.jpg',
  '/img/506986091_3639265676377448_6505629332826042357_n.jpg',
  '/img/For Revenge - Serana (Official Lyric Video).mp3',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  // Tambahkan path ke ikon PWA Anda di sini
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-512x512.png',
  '/img/icons/favicon.ico',
  '/img/icons/apple-touch-icon.png',
  '/img/icons/favicon-32x32.png',
  '/img/icons/favicon-16x16.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
