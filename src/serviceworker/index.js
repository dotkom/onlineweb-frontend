// @ts-check
const sw = self;

sw.addEventListener('install', (event) => {
  event.waitUntil(caches.open('base-cache').then((cache) => cache.add('/')));
});

sw.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});

sw.addEventListener('push', (event) => {
  console.log(event)
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const { title, ...noti } = event.data.json()

  return self.registration.showNotification(title, noti);
})

sw.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients
    .matchAll({ type: 'window'})
    .then((clientList) => {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('/');
    })
  );
});
