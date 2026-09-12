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
  const url = new URL(self.registration.scope);
  const params = new URLSearchParams();
  if (data.student_id) params.set('student_id', data.student_id);
  if (data.group_id) params.set('group_id', data.group_id);
  if (data.date) params.set('attendance_date', data.date);
  if (data.notification_id) params.set('notification_id', data.notification_id);
  url.hash = params.toString() ? `#/pupils?${params.toString()}` : '#/pupils';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    const client = list.find((item) => 'focus' in item);
    if (client) return client.navigate(url.href).then(() => client.focus());
    return clients.openWindow(url.href);
  }));
});
