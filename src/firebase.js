// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpjkncul3IBYpvi0DfdA79x-u-hbJ45Vo",
  authDomain: "challenge-e04e5.firebaseapp.com",
  projectId: "challenge-e04e5",
  storageBucket: "challenge-e04e5.appspot.com",
  messagingSenderId: "1023952588207",
  appId: "1:1023952588207:web:a52aced867224687df735a",
  measurementId: "G-CNJ9ZM6EWC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
// const Auth = auth;
export { db };
