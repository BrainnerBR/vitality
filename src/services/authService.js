// src/services/authService.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";


const authService = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  },

  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  hasRole: async (role) => {
    const user = auth.currentUser;
    if (!user) return false;

    try {
      const idTokenResult = await user.getIdTokenResult();
      return !!idTokenResult.claims[role];
    } catch (error) {
      console.error("Error checking user role:", error.message);
      return false;
    }
  },

  isAdmin: async () => {
    return authService.hasRole('admin');
  },

  register: async (email, password) => {
    return  await createUserWithEmailAndPassword(auth, email, password);
  },

  registerWithProfile: async (email, password, perfilUsuario) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Guardar datos en Firestore
      await setDoc(doc(db, "usuarios", uid), {
        email,
        ...perfilUsuario,
        fecha_registro: serverTimestamp(),
      });

      return userCredential;
    } catch (error) {
      console.error("Error al registrar y guardar perfil:", error.message);
      throw error;
    }
  },
};

export default authService;
