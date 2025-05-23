// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBpVSgzIK8mPMuqpePd5LzyeN_P7wg7duY",
  authDomain: "vitality-a8e78.firebaseapp.com",
  projectId: "vitality-a8e78",
  storageBucket: "vitality-a8e78.appspot.com", // CORREGIDO el dominio
  messagingSenderId: "23386446457",
  appId: "1:23386446457:web:26cbe538d48aec808b52a8",
  measurementId: "G-Y73LYMTGG8"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
