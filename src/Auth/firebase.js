// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // apiKey: process.env.API_KEY,
    apiKey: "AIzaSyDUL7O8FoMthZNxG1Ig8HmXRQ4dYrfX82s",
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
    // authDomain: "task-assign-b6579.firebaseapp.com",
    // projectId: "task-assign-b6579",
    // storageBucket: "task-assign-b6579.firebasestorage.app",
    // messagingSenderId: "475955546494",
    // appId: "1:475955546494:web:33d0f8f2538ec369374b2f",
    // measurementId: "G-2KCF9YC8CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);