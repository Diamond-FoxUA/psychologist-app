import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDunEd1jtJW8gZdrl9NpPFe-ljHfExE8h8",
  authDomain: "psychologistsservices-32ca8.firebaseapp.com",
  projectId: "psychologistsservices-32ca8",
  storageBucket: "psychologistsservices-32ca8.firebasestorage.app",
  messagingSenderId: "947901231646",
  appId: "1:947901231646:web:d92f939e0d2aa402e6740f",
  measurementId: "G-TFC1RTB4X4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);