// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcVwty05rEKLR9cwA4Z1kfA5kJAHpR7Is",
  authDomain: "photofolio-e5444.firebaseapp.com",
  projectId: "photofolio-e5444",
  storageBucket: "photofolio-e5444.appspot.com",
  messagingSenderId: "761466292925",
  appId: "1:761466292925:web:2710eb39efe6ae409e45d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;