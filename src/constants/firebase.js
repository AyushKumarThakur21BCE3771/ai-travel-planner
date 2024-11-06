import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpRPh8CmH3cgVvp_yW3xIWWsxYAWeNS-c",
  authDomain: "ai-t-a700e.firebaseapp.com",
  projectId: "ai-t-a700e",
  storageBucket: "ai-t-a700e.firebasestorage.app",
  messagingSenderId: "652582995724",
  appId: "1:652582995724:web:dd754091bafd4c6a31ab29",
  measurementId: "G-6NKGGHFBZP"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;