// CaloriasQuemadasChart.jsx
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getRutinasDelUsuario } from "./RutinasService";
import "chart.js/auto";

const METS = {
  cardio: 6.0,
  fuerza: 6.0,
  flexibilidad: 2.5,
};

const calcularCaloriasEjercicio = (rutina, peso) => {
  const tipo = rutina.tipo?.trim().toLowerCase();
  const duracionMin = parseFloat(rutina.duracion || 30);
  const met = METS[tipo] || 6.0;
  const pesoKg = parseFloat(peso);
  if (isNaN(pesoKg)) return 0;
  return (met * 3.5 * pesoKg / 200) * duracionMin;
};

const CaloriasQuemadasChart = ({ peso_kg }) => {
  const [datosGrafico, setDatosGrafico] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const cargarDatos = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const uid = user.uid;
      const resumen = {};

      // 1. Rutinas → Calorías quemadas
      const rutinas = await getRutinasDelUsuario(uid);
      rutinas.forEach(rutina => {
        const fecha = new Date(rutina.fecha);
        const dia = fecha.toLocaleDateString("es-CR", { weekday: "long" });
        const calorias = calcularCaloriasEjercicio(rutina, peso_kg);
        resumen[dia] = (resumen[dia] || 0) - calorias;
      });

      // 2. Comidas → Calorías consumidas
      const db = getDatabase();
      const refComidas = ref(db, "comidas");

      onValue(refComidas, snapshot => {
        const data = snapshot.val();
        const comidas = Object.values(data || {}).filter(c => c.uid === uid);
        comidas.forEach(c => {
          const fecha = new Date(c.fecha);
          const dia = fecha.toLocaleDateString("es-CR", { weekday: "long" });
          resumen[dia] = (resumen[dia] || 0) + parseFloat(c.calorias || 0);
        });

        // 3. Organizar y preparar datos
        const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
        const labels = dias;
        const datos = dias.map(d => Math.round(resumen[d] || 0));

        setDatosGrafico({
          labels,
          datasets: [
            {
              label: "Balance calórico (ingreso - gasto)",
              data: datos,
              backgroundColor: "#ef4444",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      });
    };

    cargarDatos();
  }, [peso_kg]);

  const opciones = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Calorías (kcal)" },
      },
    },
  };

return (
  <div className="w-full h-full max-w-md bg-white shadow-xl rounded-2xl p-6 m-4 text-left">
    <h2 className="text-2xl font-bold text-red-500 mb-1">Balance Calórico</h2>
    <p className="text-gray-500 text-sm mb-4">Calorías consumidas menos calorías quemadas</p>
    <Chart
      type="bar"
      data={datosGrafico}
      options={opciones}
      style={{ height: "200px", width: "100%" }}
    />
  </div>
);
};

export default CaloriasQuemadasChart;
