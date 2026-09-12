importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js', 'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const SYSTEM_NOTIFICATION_ICON = 'https://imagenes.escuelard.com/logos/logo.png';

firebase.initializeApp({
  apiKey: 'AIzaSyA9eJxcrKP8r4YuteGpfvQRTQxdj6ORqFg',
  authDomain: 'web-escuelard.firebaseapp.com',
  projectId: 'web-escuelard',
  messagingSenderId: '948522304281',
  appId: '1:948522304281:web:4ccbd164a1dac6ddf03b88',
});

firebase.messaging().setBackgroundMessageHandler((payload) => {
  const notification = payload.notification || {};
  const schoolLogo = notificationImage(payload.data?.school_logo || notification.image);
  return self.registration.showNotification(notification.title || 'EscuelaRD', {
    body: notification.body || 'Tienes una nueva notificación.',
    icon: SYSTEM_NOTIFICATION_ICON,
    image: schoolLogo,
    data: payload.data || {},
  });
});

function notificationImage(value) {
  try {
    const url = new URL(String(value || ''));
    return url.protocol === 'https:' ? url.href : SYSTEM_NOTIFICATION_ICON;
  } catch {
    return SYSTEM_NOTIFICATION_ICON;
  }
}
