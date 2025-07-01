import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Sua config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANhjg33NjCfGK9FjYeAczKX73kPOnz1rs",
  authDomain: "exemplo-8887c.firebaseapp.com",
  projectId: "exemplo-8887c",
  storageBucket: "exemplo-8887c.firebasestorage.app",
  messagingSenderId: "692959177892",
  appId: "1:692959177892:web:c5233d5c58f32e50424a31"
};

const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const db = getFirestore(app);
export {auth, db};