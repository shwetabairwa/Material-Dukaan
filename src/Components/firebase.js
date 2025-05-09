// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";



// import { DiagonalDirections } from "react-native-gesture-handler/lib/typescript/Directions";
// {hellorinkyDiagonalDirections}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2d921qPoyspLVuYWGqSEEWhzwnO2DLss",
  authDomain: "partner-app-7958a.firebaseapp.com",
  projectId: "partner-app-7958a",
  storageBucket: "partner-app-7958a.appspot.com",
  messagingSenderId: "1077703717033",
  appId: "1:1077703717033:web:6a1ff136c102e3809739b8",
  measurementId: "G-ZSF8C795NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };