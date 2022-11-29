import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, collection, addDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgw2Pva8wCPCHHSDa6CUqmCjUsZ3JkzOk",
    authDomain: "grubgram-2bccc.firebaseapp.com",
    databaseURL: "https://grubgram-2bccc-default-rtdb.firebaseio.com",
    projectId: "grubgram-2bccc",
    storageBucket: "grubgram-2bccc.appspot.com",
    messagingSenderId: "12941980945",
    appId: "1:12941980945:web:6be4c61e23fe9dd57948b0",
    measurementId: "G-TJY8Z1B1VJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut, collection, addDoc};