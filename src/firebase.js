import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhGn8spk-MiYiFumF6FtBaWTDWi7H_DHs",
  authDomain: "vakinhaonline-665d6.firebaseapp.com",
  projectId: "vakinhaonline-665d6",
  storageBucket: "vakinhaonline-665d6.firebasestorage.app",
  messagingSenderId: "965716247651",
  appId: "1:965716247651:web:2ddb98f63523753e45e456",
  measurementId: "G-QVG26LCMWR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);