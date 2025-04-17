import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfPZdKLb5AJJbbkXwOrYyAmlT5WonEsbM",
  authDomain: "diafitness-8a56c.firebaseapp.com",
  projectId: "diafitness-8a56c",
  storageBucket: "diafitness-8a56c.firebasestorage.app",
  messagingSenderId: "378347485199",
  appId: "1:378347485199:web:6bfdc5e278621e6d91cb7a",
  measurementId: "G-242R5K8R6Y"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); 

const analytics = getAnalytics(FIREBASE_APP);