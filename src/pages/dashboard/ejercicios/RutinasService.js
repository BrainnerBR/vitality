import { getDatabase, ref, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth";

export const getRutinasDelUsuario = async (userId) => {
  const db = getDatabase();
  const rutinasRef = ref(db, "rutinas");

  const snapshot = await get(rutinasRef);
  const data = snapshot.val();
  if (!data) return [];

  return Object.entries(data)
    .filter(([_, rutina]) => rutina.uid === userId)
    .map(([id, rutina]) => ({ id, ...rutina }));
};

