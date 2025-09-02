// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6SYteYdwQJwyp_Db_7DrN2nbikYO3xlw",
  authDomain: "week7-yuhan-3f228.firebaseapp.com",
  projectId: "week7-yuhan-3f228",
  storageBucket: "week7-yuhan-3f228.appspot.com",
  messagingSenderId: "885380976442",
  appId: "1:885380976442:web:49dbc92b6654ea09844a03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export default db