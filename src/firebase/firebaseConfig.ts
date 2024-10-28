// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Fm8yUvBKjqzZV8Qy83xW58ovuG11sFY",
  authDomain: "metting-c62e5.firebaseapp.com",
  projectId: "metting-c62e5",
  storageBucket: "metting-c62e5.appspot.com",
  messagingSenderId: "396821337437",
  appId: "1:396821337437:web:576dead30a4912a4a844b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const facebookProvider = new FacebookAuthProvider();

export const storage = getStorage(app);
export const db = getFirestore(app);
