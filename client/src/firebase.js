// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b7283.firebaseapp.com",
  projectId: "mern-blog-b7283",
  storageBucket: "mern-blog-b7283.appspot.com",
  messagingSenderId: "162771934726",
  appId: "1:162771934726:web:8774da78cf7660fc63ed87"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);