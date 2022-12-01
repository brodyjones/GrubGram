import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9WRTw6DrdE_Y6oxxXzvaitnUKKW7gHKU",
  authDomain: "grubgramtester.firebaseapp.com",
  projectId: "grubgramtester",
  storageBucket: "grubgramtester.appspot.com",
  messagingSenderId: "84222334813",
  appId: "1:84222334813:web:9cea9bb4331dc17eb1bab4",
  measurementId: "G-0PQLT79NZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, storage, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, collection, addDoc };