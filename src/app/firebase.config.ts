import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMuagdYbK-NPkR6UpFy4JkqWrHXlKOz6g",
  authDomain: "login-2c4c2.firebaseapp.com",
  projectId: "login-2c4c2",
  storageBucket: "login-2c4c2.firebasestorage.app",
  messagingSenderId: "157121206800",
  appId: "1:157121206800:web:92a0a7f60b4e64b54a4895",
  measurementId: "G-RWS5ZTEN8H",
};

// نهيّأ التطبيق
const app = initializeApp(firebaseConfig);

// نجهّز الـ Auth و الـ Provider بتاع جوجل
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
