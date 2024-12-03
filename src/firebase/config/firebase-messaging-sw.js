import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { messaging } from "./index";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCY48C54J36Q7-yB7RrXCOEEx67XvYO4W4",
  authDomain: "customer-table-3ae24.firebaseapp.com",
  projectId: "customer-table-3ae24",
  storageBucket: "customer-table-3ae24.firebasestorage.app",
  messagingSenderId: "748510172849",
  appId: "1:748510172849:web:7c3915d391a820933d7490",
  measurementId: "G-89B2KTC31K",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
