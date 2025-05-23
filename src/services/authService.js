// src/services/authService.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const authService = {
  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  },

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
  }
};

export default authService;
