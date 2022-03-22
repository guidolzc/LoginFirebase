import 'firebase/firestore';
import 'firebase/auth';
 
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, setDoc, collection,getDocs,updateDoc,doc,deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
 
// tu web app de firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm_Q6VeAxcwJ3WdvbuH1m_X4mLU57WXHA",
  authDomain: "react-app-rgf.firebaseapp.com",
  projectId: "react-app-rgf",
  storageBucket: "react-app-rgf.appspot.com",
  messagingSenderId: "539504182005",
  appId: "1:539504182005:web:d1fa97f6f02ebd9266fbbc"
};


// inicializacion de firebase 
const app = initializeApp(firebaseConfig);
 
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
 
 export {
  deleteDoc,
   doc,
  updateDoc,
   getDocs,
     db,
     googleAuthProvider,
     signInWithPopup,
     getAuth,
     addDoc, //Referencia a documento en Firestore
     setDoc, // Setea Datos en la base de Firestore,
     collection,
 }