import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCn4ePpLlPxhUhf_bsMb4uTm121kUmfIjk",
 authDomain: "emotionlights-3760e.firebaseapp.com",
 databaseURL: "https://emotionlights-3760e-default-rtdb.asia-southeast1.firebasedatabase.app",
 projectId: "emotionlights-3760e",
 storageBucket: "emotionlights-3760e.appspot.com",
 messagingSenderId: "130066319770",
 appId: "1:130066319770:web:c3ebb663d41ac3a0475223",
 measurementId: "G-E0TEW72PQP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;
