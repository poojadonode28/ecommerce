// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8x4g1u-tMft5bJMZdnoYcBbGvn3ksPMQ",
  authDomain: "ecommerce1-e45f5.firebaseapp.com",
  projectId: "ecommerce1-e45f5",
  storageBucket: "ecommerce1-e45f5.appspot.com",
  messagingSenderId: "998458364781",
  appId: "1:998458364781:web:4f1297013f438f42e60064"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)