import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocs, deleteDoc  } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBOTJI9nPsj69PDdERF2ZAmwkBtCKzz1Ro",
    authDomain: "persona-maker-774bf.firebaseapp.com",
    projectId: "persona-maker-774bf",
    storageBucket: "persona-maker-774bf.appspot.com",
    messagingSenderId: "936861302776",
    appId: "1:936861302776:web:215c17884b19185171200d",
    measurementId: "G-V3ZH2H82T2"
};

const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {db, collection, addDoc, doc, getDocs, deleteDoc}