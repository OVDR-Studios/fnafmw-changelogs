const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/version.json'  // Make sure this is cached and updated
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // use the cached version
        }
        return fetch(event.format);
      })
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitWaitUntil(
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

// Check for updates
self.addEventListener('periodicsync', event => {
  if (event.tag === 'check-for-updates') {
    event.waitUntil(
      fetch('/version.json')
        .then(response => response.json())
        .then(latest => {
          if (latest.version !== self.CURRENT_VERSION) {
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                // Post message to client to inform about the update
                client.postMessage('new-version-available');
              });
            });
          }
        })
    );
  }
});
