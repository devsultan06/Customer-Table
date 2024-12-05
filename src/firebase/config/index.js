// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

// Get Firebase credentials from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const messaging = getMessaging(app);

// export const generateToken = async () => {
//   const token = await getToken(messaging, {
//     vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//   });
//   console.log("Token:", token);
// };

export const generateToken = async () => {
  // Check if permission is already granted
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission not granted.");
    return;
  }

  // Check if token is already stored
  const existingToken = localStorage.getItem("fcmToken");
  if (existingToken) {
    console.log("Using cached token:", existingToken);
    return existingToken;
  }

  // Generate a new token
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    if (token) {
      console.log("Generated token:", token);
      localStorage.setItem("fcmToken", token); // Cache the token
      return token;
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
