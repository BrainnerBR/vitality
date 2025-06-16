import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Frase from '../../../components/Frase';
import CaloriasQuemadasChart from '../ejercicios/CaloriasQuemadasChart';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import correcto
import ResumenActividad from './ResumenActividad';
import EjercicioPorDiaChart from './EjercicioPorDiaChart';
import RetosSemanales from './RetosSemanales';
import RetoDiario from './RetoDiario';
import MetaAguaChart from './MetaAguaChart';


const Progreso = () => {
  const [pesoUsuario, setPesoUsuario] = useState(null);
useEffect(() => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  const fetchPeso = async () => {
    const db = getFirestore();
    const userRef = doc(db, "usuarios", user.uid); // 👈 Ruta correcta
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("📦 Datos del usuario desde Firestore:", data);

      if (data.peso_kg) {
        setPesoUsuario(parseFloat(data.peso_kg));
      } else {
        console.warn("⚠️ El campo 'peso_kg' no existe en el documento.");
      }
    } else {
      console.warn("⚠️ No existe documento del usuario.");
    }
  };

  fetchPeso();
}, []);

return (
  <div>
<div className="flex flex-col md:flex-row gap-7 w-full items-stretch px-2 ">
  {/* Frase */}
  <div className="flex-1">
    <div className="bg-white rounded-xl flex flex-col justify-between">
      <Frase />
    </div>
  </div>

  {/* Actividad */}
  <div className="flex-1">
    <div className="bg-white rounded-xl flex flex-col justify-between">
      <ResumenActividad />
    </div>
  </div>

  {/* Reto Diario */}
  <div className="flex-1">
    <div className="bg-white rounded-xl flex flex-col justify-between">
      <RetoDiario />
    </div>
  </div>
</div>





<div className="flex flex-col items-center md:flex-row md:justify-center gap-12 px-4 h-full">
  {/* Calorías quemadas */}
  <div className="w-full md:w-[30%] max-w-md">
    {pesoUsuario !== null ? (
      <CaloriasQuemadasChart peso_kg={pesoUsuario} />
    ) : (
      <p className="text-center text-gray-500 mt-4">Cargando datos del usuario...</p>
    )}
  </div>

  {/* Actividad en el centro */}
  <div className="w-full md:w-[30%] max-w-md">
    <EjercicioPorDiaChart/>
  </div>

  <div className="w-full md:w-[30%] max-w-md">
    <MetaAguaChart/>
  </div>
</div>
<div className='px-4'>
    <RetosSemanales/>
</div>


  </div>
);

};

export default Progreso;
