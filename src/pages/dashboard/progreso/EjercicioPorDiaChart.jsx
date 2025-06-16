// GraficoEjercicioSemanal.jsx
import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "chart.js/auto";

const coloresPorNivel = (minutos) => {
  if (minutos >= 60) return "#22c55e";      // verde
  if (minutos >= 30) return "#facc15";      // amarillo
  return "#ef4444";                         // rojo
};

const obtenerRecomendacion = (objetivo) => {
  if (objetivo.includes("bajar")) return "¡Intenta al menos 30 min diarios!";
  if (objetivo.includes("subir")) return "Enfócate en fuerza, mínimo 45 min";
  return "Mantén al menos 3 sesiones por semana para mantenerte en forma";
};

const GraficoEjercicioSemanal = () => {
  const [dataChart, setDataChart] = useState({ labels: [], datasets: [] });
  const [recomendacion, setRecomendacion] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const refRutinas = ref(db, "rutinas");

    const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    const resumen = {
      lunes: 0, martes: 0, miércoles: 0, jueves: 0, viernes: 0, sábado: 0, domingo: 0,
    };

    onValue(refRutinas, (snapshot) => {
      const todas = snapshot.val();
      Object.values(todas || {}).forEach((rutina) => {
        if (rutina.uid === user.uid) {
          const fecha = new Date(rutina.fecha);
          const dia = fecha.toLocaleDateString("es-CR", { weekday: "long" });
          const minutos = parseFloat(rutina.duracion || 0);
          if (resumen[dia] !== undefined) resumen[dia] += minutos;
        }
      });

      const labels = dias;
      const datos = dias.map((d) => resumen[d]);
      const backgroundColors = datos.map(coloresPorNivel);

      setDataChart({
        labels,
        datasets: [
          {
            label: "Minutos de ejercicio",
            data: datos,
            backgroundColor: backgroundColors,
          },
        ],
      });
    });

    // Obtener objetivo del usuario desde Firestore
    const fetchObjetivo = async () => {
      const fs = getFirestore();
      const docRef = doc(fs, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const objetivo = docSnap.data().objetivos?.[0]?.toLowerCase() || "mantener";
        setRecomendacion(obtenerRecomendacion(objetivo));
      }
    };

    fetchObjetivo();
  }, []);

  const opciones = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Minutos" },
      },
    },
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 m-4 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-2">Actividad Semanal</h2>
      <p className="text-sm text-gray-600 mb-4">{recomendacion}</p>
      <Chart type="bar" data={dataChart} options={opciones} />
    </div>
  );
};

export default GraficoEjercicioSemanal;
