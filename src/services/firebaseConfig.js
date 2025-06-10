import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBpVSgzIK8mPMuqpePd5LzyeN_P7wg7duY",
  authDomain: "vitality-a8e78.firebaseapp.com",
  databaseURL: "https://vitality-a8e78-default-rtdb.firebaseio.com",
  projectId: "vitality-a8e78",
  storageBucket: "vitality-a8e78.appspot.com",
  messagingSenderId: "23386446457",
  appId: "1:23386446457:web:26cbe538d48aec808b52a8",
  measurementId: "G-Y73LYMTGG8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
