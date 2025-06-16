import React, { useEffect, useState } from "react";
import { PiFireBold, PiCalendarBlankBold } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const ResumenActividad = () => {
  const [racha, setRacha] = useState(1);
  const [metaHoy, setMetaHoy] = useState("");

useEffect(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const hoy = new Date().toISOString().split("T")[0];
  const rachaKey = `rachaActual_${user.uid}`;
  const fechaKey = `ultimaEntrada_${user.uid}`;


  const ultimaFecha = localStorage.getItem(fechaKey);
  const rachaGuardada = parseInt(localStorage.getItem(rachaKey) || "0");

  if (!ultimaFecha) {
    localStorage.setItem(rachaKey, "1");
    localStorage.setItem(fechaKey, hoy);
    setRacha(1);
    return;
  }

  if (ultimaFecha === hoy) {
    setRacha(rachaGuardada);
    return;
  }

  const diff = (new Date(hoy) - new Date(ultimaFecha)) / (1000 * 60 * 60 * 24);

  if (diff === 1) {
    const nuevaRacha = rachaGuardada + 1;
    localStorage.setItem(rachaKey, nuevaRacha.toString());
    setRacha(nuevaRacha);
  } else {
    localStorage.setItem(rachaKey, "1");
    setRacha(1);
  }

  localStorage.setItem(fechaKey, hoy);
}, []);





useEffect(() => {
  const MUSCULOS = ["pecho", "espalda", "piernas", "hombros", "brazos", "descanso"];

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const db = getDatabase();
  const refRutinas = ref(db, "rutinas");

  onValue(refRutinas, (snapshot) => {
    const rutinas = Object.values(snapshot.val() || {})
      .filter(r => r.uid === user.uid)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Más recientes primero

    const MUSCULOS = ["pecho", "espalda", "piernas", "hombros", "brazos", "descanso"];

    const diasEntrenados = [];

    for (const rutina of rutinas) {
      const tipo = rutina.musculo?.toLowerCase();
      if (tipo && !diasEntrenados.includes(tipo) && MUSCULOS.includes(tipo)) {
        diasEntrenados.push(tipo);
      }
    }

    // Averiguar el último músculo
    const ultimo = diasEntrenados[0] || "descanso";
    const idx = MUSCULOS.indexOf(ultimo);
    const siguiente = MUSCULOS[(idx + 1) % MUSCULOS.length];

    // Generar meta
    let texto = "";

    if (siguiente === "descanso") {
      texto = "Día de descanso activo o caminata suave";
    } else {
      texto = `Hoy toca entrenamiento de ${siguiente}`;
    }

    setMetaHoy(texto);
  });
}, []);


  return (
    <div className="bg-white rounded-xl shadow-xl p-4 w-full">
      <div className="text-xl font-bold flex items-center gap-2 text-red-600 mb-2">
        <PiFireBold className="text-2xl" />
        Tu Actividad
      </div>

      <div className="text-gray-700 mb-2 flex items-center gap-2">
        <PiCalendarBlankBold className="text-lg text-red-500" />
        Racha activa: <span className="font-semibold text-red-500">{racha} día{racha > 1 ? "s" : ""}</span>
      </div>

      <div className="text-gray-700 mb-4 flex items-center gap-2 italic text-sm">
        <TbTargetArrow className="text-lg text-yellow-600" />
        Meta de hoy: <span className="text-gray-800">{metaHoy}</span>
      </div>
    </div>
  );
};

export default ResumenActividad;
