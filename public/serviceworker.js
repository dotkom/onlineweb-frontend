const sw = self;
const cacheName = 'owf-cache';
const cachesToKeep = [cacheName];

sw.addEventListener('install', () => {
  self.skipWaiting(); // Ensures that any new, waiting eventlistener becomes the active one.
});

// Cleanup unwanted caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cachesToKeep.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Respond to fetches with a network then cache strategy.
sw.addEventListener('fetch', (event) => {
  event.respondWith(networkThenCache(event));
});

// Network then cache strategy responds from the network if possible, while updating the cache.
// If network is unreachable it returns from cache.
const networkThenCache = (event) => {
  const networkFetch = fetch(event.request);
  event.waitUntil(
    networkFetch.then((response) => {
      const responseClone = response.clone();
      caches.open(cacheName).then((cache) => cache.put(event.request, responseClone));
    })
  );
  return networkFetch.catch(() => caches.match(event.request));
};

const displayNotification = async (event) => {
  /** Cancel if notifications are not supported or not granted access */
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const { title, ...noti } = event.data.json();
  await self.registration.showNotification(title, noti);

  return;
};

sw.addEventListener('push', (event) => {
  event.waitUntil(displayNotification(event));
});

const focusFromNotification = async (event) => {
  event.notification.close();

  /** Get all windows of the this webapp from the client */
  const windows = await clients.matchAll({ type: 'window' });
  /** Filter windows which can focus and is at the root url */
  const rootWindows = windows.filter((w) => w.url === '/' && 'focus' in w);

  /** Focus on the first available window */
  rootWindows.forEach((w) => {
    return w.focus();
  });
  /** If no windows are available open a new one */
  if (clients.openWindow) {
    clients.openWindow('/');
  }
};

sw.addEventListener('notificationclick', (event) => {
  event.waitUntil(focusFromNotification(event));
});
