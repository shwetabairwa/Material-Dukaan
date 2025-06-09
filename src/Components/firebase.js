// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // ✅ this is needed

const firebaseConfig = {
  apiKey: "AIzaSyAeCbjC_XEQhm_tfMyOcRJYNv9Dmx4ssEs",
  authDomain: "partner-app-dev-edcbd.firebaseapp.com",
  projectId: "partner-app-dev-edcbd",
  storageBucket: "partner-app-dev-edcbd.appspot.com",
  messagingSenderId: "117472585325",
  appId: "1:117472585325:web:5e8d27de40e726a0be4164",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ this is important
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
