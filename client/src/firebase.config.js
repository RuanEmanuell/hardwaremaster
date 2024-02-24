import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsuGjiiIg1gNV-Vex03iNTQbGfIT2T3EU",
  authDomain: "hardwaremaster-46045.firebaseapp.com",
  projectId: "hardwaremaster-46045",
  storageBucket: "hardwaremaster-46045.appspot.com",
  messagingSenderId: "1087105817145",
  appId: "1:1087105817145:web:a457b997bccd34b67e0be8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);