// Scripts for firebase and firebase messaging
if (typeof importScripts === 'function') {
  // eslint-disable-next-line no-undef
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
  // eslint-disable-next-line no-undef
  importScripts(
    'https://www.gstatic.com/firebasejs/8.2.0/firebasey-messaging.js',
  );
}

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
