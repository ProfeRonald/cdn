self.skipWaiting();

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.stopImmediatePropagation();
  event.notification.close();
  event.waitUntil(openNotification(event.notification.data || {}));
});

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

function notificationData(raw = {}) {
  return raw?.FCM_MSG?.data || raw?.data || raw || {};
}

function notificationUrl(raw = {}) {
  const data = notificationData(raw);
  const fallback = `/#/links-notifications?id=${encodeURIComponent(data.notification_id || '')}`;
  const firebaseLink = raw?.FCM_MSG?.fcmOptions?.link || raw?.FCM_MSG?.fcm_options?.link || '';
  let target;
  try {
    target = new URL(String(data.link || firebaseLink || fallback), self.location.origin);
  } catch {
    target = new URL(fallback, self.location.origin);
  }
  if (!isAllowedAppOrigin(target.origin)) {
    target = new URL(fallback, self.location.origin);
  }
  appendAttendanceContext(target, data);
  target.searchParams.set('push_click', String(Date.now()));
  return target.href;
}

function appendAttendanceContext(target, data) {
  const [route, query = ''] = target.hash.replace(/^#/, '').split('?', 2);
  if (route !== '/links-notifications') return;
  const params = new URLSearchParams(query);
  const values = {
    student_id: data.student_id,
    group_id: data.group_id,
    attendance_date: data.attendance_date || data.date,
    school_id: data.school_id,
  };
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value) !== '') params.set(key, String(value));
  });
  target.hash = `${route}?${params.toString()}`;
}

async function openNotification(raw = {}) {
  const target = notificationUrl(raw);
  const targetUrl = new URL(target);
  const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  const current = windows.find((client) => {
    try {
      return new URL(client.url).origin === self.location.origin;
    } catch {
      return false;
    }
  });

  if (current) {
    const navigated = await current.navigate(targetUrl.href);
    return navigated.focus();
  }

  return self.clients.openWindow(target);
}

function isAllowedAppOrigin(origin) {
  return new Set([
    self.location.origin,
    'https://escuelard.edu.do',
    'https://www.escuelard.edu.do',
    'https://escuelard.com',
    'https://www.escuelard.com',
  ]).has(origin);
}
