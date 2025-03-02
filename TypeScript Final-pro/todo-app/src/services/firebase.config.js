import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyA0CZJVXc8TGlEm3Zo97kqwyoMIr_hFgn0",
    authDomain: "task-manager-ff509.firebaseapp.com",
    projectId: "task-manager-ff509",
    storageBucket: "task-manager-ff509.firebasestorage.app",
    messagingSenderId: "614710914650",
    appId: "1:614710914650:web:1e288589e98bd1899cf263",
    measurementId: "G-9FT3LLFLCE"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);