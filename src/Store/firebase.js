import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD7ljOxZ1ZlrtJ-h_Hg3CFUs6w94QC1QY",
  authDomain: "leaselink-a8e5a.firebaseapp.com",
  projectId: "leaselink-a8e5a",
  storageBucket: "leaselink-a8e5a.firebasestorage.app",
  messagingSenderId: "838427434421",
  appId: "1:838427434421:web:be79d97b812c39a8634dfc",
  measurementId: "G-1QDXCMBHGV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);