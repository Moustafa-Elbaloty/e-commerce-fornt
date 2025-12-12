import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMuagdYbK-NPkR6UpFy4JkqWrHXlKOz6g",
  authDomain: "login-2c4c2.firebaseapp.com",
  projectId: "login-2c4c2",
  storageBucket: "login-2c4c2.firebasestorage.app",
  messagingSenderId: "157121206800",
  appId: "1:157121206800:web:92a0a7f60b4e64b54a4895",
  measurementId: "G-RWS5ZTEN8H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

