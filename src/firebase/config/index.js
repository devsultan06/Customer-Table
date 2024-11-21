// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIIAH1MNv7ZuavxR75ga622PwUQONInzs",
  authDomain: "customer-table-badb2.firebaseapp.com",
  projectId: "customer-table-badb2",
  storageBucket: "customer-table-badb2.firebasestorage.app",
  messagingSenderId: "789670405710",
  appId: "1:789670405710:web:247e77c8526883b24e451f",
  measurementId: "G-1S2GWZJBLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
