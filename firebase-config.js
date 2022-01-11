// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC-N1b_MJpdF74cAwmy4DV7Y7q-T1HtWgw",
  authDomain: "mutfaksirlari-cfa48.firebaseapp.com",
  projectId: "mutfaksirlari-cfa48",
  storageBucket: "mutfaksirlari-cfa48.appspot.com",
  messagingSenderId: "62222574858",
  appId: "1:62222574858:web:c435083bb62a8feb43c6f3",
  measurementId: "G-VS37Q5NP4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
