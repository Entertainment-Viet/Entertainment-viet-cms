import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};
let messaging;
const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;
try {
  firebase.initializeApp(firebaseConfig);

  messaging = firebase.messaging();
} catch (err) {
  console.log(err);
}

export const getToken = async setTokenFound => {
  let currentToken = '';

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (setTokenFound) {
      if (currentToken) {
        setTokenFound(true);
        // const FIREBASE_API_KEY = firebaseConfig.apiKey;
        // const topicURL = `https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/DEMO`;
      } else {
        setTokenFound(false);
      }
    }
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(firebaseToken => {
        resolve(firebaseToken);
      })
      .catch(err => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise(resolve => {
    messaging.onMessage(payload => {
      resolve(payload);
    });
  });
