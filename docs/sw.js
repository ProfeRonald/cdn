const CACHE_NAME = 'escuelard-v4-shell-2';
const APP_SHELL = ['./'];

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js', 'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyA9eJxcrKP8r4YuteGpfvQRTQxdj6ORqFg',
  authDomain: 'web-escuelard.firebaseapp.com',
  projectId: 'web-escuelard',
  messagingSenderId: '948522304281',
  appId: '1:948522304281:web:4ccbd164a1dac6ddf03b88',
});
firebase.messaging().setBackgroundMessageHandler((payload) => {
  const notification = payload.notification || {};
  return self.registration.showNotification(notification.title || 'EscuelaRD', {
    body: notification.body || 'Tienes una nueva notificación.',
    icon: './favicon.ico',
    data: payload.data || {},
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const route = typeof data.route === 'string' && data.route.startsWith('#/') ? data.route : '#/pupils';
  const url = new URL(self.registration.scope);
  const separator = route.includes('?') ? '&' : '?';
  url.hash = data.notification_id ? `${route}${separator}notification_id=${encodeURIComponent(data.notification_id)}` : route;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const existing = clientList.find((client) => 'focus' in client);
      if (existing) {
        existing.navigate(url.href);
        return existing.focus();
      }
      return clients.openWindow(url.href);
    }),
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.pathname.includes('/app-api/') || url.hostname === 'api.escuelard.com') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || cache.match('./');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request).then((response) => {
    if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || network;
}
