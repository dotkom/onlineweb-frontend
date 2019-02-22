const sw = self;

sw.addEventListener('install', (event) => {
  event.waitUntil(caches.open('base-cache').then((cache) => cache.add('/')));
});

sw.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});

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
