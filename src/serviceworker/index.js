// @ts-check
const sw = self;

sw.addEventListener('install', (event) => {
  event.waitUntil(caches.open('base-cache').then((cache) => cache.add('/')));
});

sw.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
