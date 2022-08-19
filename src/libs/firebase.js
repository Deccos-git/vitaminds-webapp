// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_y0DwGVL7PCB7xc5s2lSiaPCyzrGZOV4",
  authDomain: "vitaminds-78cfa.firebaseapp.com",
  databaseURL: "https://vitaminds-78cfa.firebaseio.com",
  projectId: "vitaminds-78cfa",
  storageBucket: "vitaminds-78cfa.appspot.com",
  messagingSenderId: "645063606604",
  appId: "1:645063606604:web:f8e27d4577f8622d",
  measurementId: "G-ZXS5YZWSZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage }