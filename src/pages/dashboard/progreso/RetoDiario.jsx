// RetoDiario.jsx
import React, { useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { FaDumbbell, FaUtensils, FaWater, FaBrain, FaShoePrints, FaBed } from "react-icons/fa";
import retosDiarios from '../../../services/RetosDiarios.json';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const iconos = {
  ejercicio: <FaDumbbell className="text-xl text-blue-600" />, 
  comida: <FaUtensils className="text-xl text-green-600" />, 
  agua: <FaWater className="text-xl text-cyan-500" />, 
  habito: <FaBrain className="text-xl text-purple-500" />,
  pasos: <FaShoePrints className="text-xl text-orange-400" />,
  descanso: <FaBed className="text-xl text-gray-500" />
};

const RetoDiario = () => {
  const [reto, setReto] = useState(null);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    const retoGuardado = localStorage.getItem("retoDiario");
    const fechaGuardada = localStorage.getItem("fechaReto");

    if (retoGuardado && fechaGuardada === hoy) {
      setReto(JSON.parse(retoGuardado));
    } else {
      const nuevoReto = retosDiarios[Math.floor(Math.random() * retosDiarios.length)];
      setReto(nuevoReto);
      localStorage.setItem("retoDiario", JSON.stringify(nuevoReto));
      localStorage.setItem("fechaReto", hoy);
    }
  }, []);

  useEffect(() => {
    if (!reto) return;
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const hoy = new Date().toISOString().split("T")[0];

    // Agua
    if (reto.tipo === "agua") {
      onValue(ref(db, "agua"), snapshot => {
        const registros = Object.values(snapshot.val() || {});
        const total = registros.filter(r => r.uid === user.uid && r.fecha?.startsWith(hoy))
          .reduce((acc, r) => acc + parseInt(r.cantidad || 0), 0);
        setProgreso(Math.min((total / reto.meta) * 100, 100));
      });
    }

    // Comida
    if (reto.tipo === "comida") {
      onValue(ref(db, "comidas"), snapshot => {
        const registros = Object.values(snapshot.val() || {});
        const tipos = new Set();
        registros.forEach(r => {
          if (r.uid === user.uid && r.fecha?.startsWith(hoy)) {
            tipos.add(r.tipo);
          }
        });
        setProgreso(Math.min((tipos.size / reto.meta) * 100, 100));
      });
    }

    // Ejercicio
    if (reto.tipo === "ejercicio") {
      onValue(ref(db, "rutinas"), snapshot => {
        const registros = Object.values(snapshot.val() || {});
        const hayHoy = registros.some(r => r.uid === user.uid && r.fecha?.startsWith(hoy));
        setProgreso(hayHoy ? 100 : 0);
      });
    }

    // Hábitos (simulación con consistencia)
    if (reto.tipo === "habito") {
      const diasPrevios = JSON.parse(localStorage.getItem("diasIngresados") || "[]");
      const hoy = new Date().toISOString().split("T")[0];
      const completado = diasPrevios.includes(hoy);
      setProgreso(completado ? 100 : 0);
    }
  }, [reto]);

  if (!reto) return null;

  return (
<div className="bg-white rounded-xl shadow-md p-4 h-full flex flex-col justify-between">
  <h2 className="text-lg font-bold text-red-500 text-center mb-2">Reto Diario</h2>

  <div className="flex items-center gap-2 mb-1">
    {iconos[reto.tipo]}
    <h3 className="text-base font-semibold text-gray-800">{reto.nombre}</h3>
  </div>

  <p className="text-sm text-gray-600 flex-grow">{reto.descripcion}</p>

  <div className="mt-1">
    <ProgressBar value={progreso} showValue={false} className="mb-0" />
    <div className="text-xs text-right text-gray-500">
      {progreso === 100 ? "¡Reto completado!" : `${Math.round(progreso)}% completado`}
    </div>
  </div>
</div>

  );
};

export default RetoDiario;
