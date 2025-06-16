import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ref = doc(db, "usuarios", user.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const datos = snap.data();
            setUsuario({
              nombre: datos.nombre || "Nombre no disponible",
              apellido: datos.apellido || "",
              email: user.email,
              sexo: datos.sexo === "M" ? "Masculino" : "Femenino",
              altura: datos.altura_cm || 0,
              peso: datos.peso_kg || 0,
              objetivos: datos.objetivos || [],
              nivel: datos.nivel_fitness || "No especificado",
              frecuencia: datos.frecuencia_semanal || 0,
              fechaNacimiento: datos.fecha_nacimiento || "N/D",
              fotoURL: user.photoURL || "",
              fechaRegistro: datos.fecha_registro?.toDate?.().toLocaleString() || "N/D",
            });
          }
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return <div className="text-center p-4 text-gray-500">Cargando perfil...</div>;
  }

  if (!usuario) {
    return <div className="text-center p-4 text-red-500">No se encontró el perfil.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
      {/* Foto y nombre */}
      <div className="flex items-center gap-4">
        <img
          src={usuario.fotoURL || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"}
          alt="Foto de perfil"
          className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {usuario.nombre} {usuario.apellido}
          </h2>
          <p className="text-gray-600 text-sm">{usuario.email}</p>
        </div>
      </div>

      {/* Datos personales */}
      <div>
        <h3 className="text-lg font-semibold text-red-500 mb-2">Información personal</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Sexo:</strong> {usuario.sexo}</li>
          <li><strong>Fecha de nacimiento:</strong> {usuario.fechaNacimiento}</li>
          <li><strong>Altura:</strong> {usuario.altura} cm</li>
          <li><strong>Peso:</strong> {usuario.peso} kg</li>
        </ul>
      </div>

      {/* Detalles de fitness */}
      <div>
        <h3 className="text-lg font-semibold text-red-500 mb-2">Datos de entrenamiento</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Nivel:</strong> {usuario.nivel}</li>
          <li><strong>Frecuencia semanal:</strong> {usuario.frecuencia} días</li>
          <li><strong>Objetivos:</strong> {usuario.objetivos.join(", ")}</li>
          <li><strong>Fecha de registro:</strong> {usuario.fechaRegistro}</li>
        </ul>
      </div>

    </div>
  );
};

export default Perfil;
