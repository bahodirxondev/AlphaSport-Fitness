import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrBIlFaYepw0BRHsmMGDfQLvyqBWmsYD4",
  authDomain: "alpha-sport-fitness.firebaseapp.com",
  projectId: "alpha-sport-fitness",
  storageBucket: "alpha-sport-fitness.appspot.com",
  messagingSenderId: "290324021268",
  appId: "1:290324021268:web:d64a000c8c91c7dc336701"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
