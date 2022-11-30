import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, collection, addDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbZpCcocyojX7HFQHW5sbsF3fI6ir-19w",
  authDomain: "grubgram2.firebaseapp.com",
  projectId: "grubgram2",
  storageBucket: "grubgram2.appspot.com",
  messagingSenderId: "453099754364",
  appId: "1:453099754364:web:a4be31ab8586c5afdbcaf9",
  measurementId: "G-B5SRDCHKMF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut, collection, addDoc};