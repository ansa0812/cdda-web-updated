// service-worker.js

const CACHE_NAME = 'game-cache-v1';

// List of all resources to cache for offline use
const resourcesToCache = [
  '/index.html',
  '/all.min.css',
  '/screenfull.min.js',
  '/jszip.min.js',
  '/FileSaver.min.js',
  '/cataclysm-tiles.js',
  '/fa-solid-900.woff2',
  '/Terminus.ttf',
  '/cataclysm-tiles.data',
  '/cataclysm-tiles.wasm',
  '/favicon.ico',  // Optional, if you want it to load offline
  // Add other assets as needed
];

// Install event - Caching all the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(resourcesToCache);
    })
  );
});

// Fetch event - Intercepting network requests and serving from cache if possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // If the resource is in the cache, return it
      return response || fetch(event.request); // If not, try to fetch it from the network
    })
  );
});

// Activate event - Clean up old caches if any
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
