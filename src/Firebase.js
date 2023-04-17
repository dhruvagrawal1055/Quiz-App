// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore, } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAD4woQp2vqU4OgiCt1cnl03SQUpRPqyHM",
//     authDomain: "quizapp-a43c6.firebaseapp.com",
//     projectId: "quizapp-a43c6",
//     storageBucket: "quizapp-a43c6.appspot.com",
//     messagingSenderId: "312893508864",
//     appId: "1:312893508864:web:af44754ecb31dbc117b7e5",
//     measurementId: "G-V94PTPWE80"
// };

// Initialize Firebase
// // const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAo0lbnKf-dJbUVkDMFlxR0OvfEQWELpPM",
    authDomain: "quizzery-3e91e.firebaseapp.com",
    projectId: "quizzery-3e91e",
    storageBucket: "quizzery-3e91e.appspot.com",
    messagingSenderId: "372447839336",
    appId: "1:372447839336:web:e63b18362182c4c228a7dd",
    measurementId: "G-BK3L8MH2ZH"
};

const app = initializeApp(firebaseConfig);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();