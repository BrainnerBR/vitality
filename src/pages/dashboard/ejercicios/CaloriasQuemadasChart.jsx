// CaloriasQuemadasChart.jsx
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { getRutinasDelUsuario } from "./RutinasService";
import { getAuth } from "firebase/auth";
import "chart.js/auto";

const calcularCalorias = (rutina, peso) => {
  const METS = {
    cardio: 6.0,
    fuerza: 6.0,
    flexibilidad: 2.5,
  };

  const tipo = rutina.tipo?.trim().toLowerCase();
  const duracionMin = parseFloat(rutina.duracion || (tipo === "fuerza" ? 30 : 0));
  const met = METS[tipo] || 6.0;

  const pesoEnKg = parseFloat(peso);  // 🔧 <- Aquí está la clave

  if (isNaN(pesoEnKg)) {
    console.warn("⚠️ Peso inválido:", peso);
    return 0;
  }

  return (met * 3.5 * pesoEnKg / 200) * duracionMin;
};



const CaloriasQuemadasChart = ({ peso_kg }) => {
  const [datosGrafico, setDatosGrafico] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const cargarDatos = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const rutinas = await getRutinasDelUsuario(user.uid);
      console.log("Rutinas cargadas:", rutinas);

      const resumen = {};

        rutinas.forEach((rutina) => {
        console.log("Tipo:", rutina.tipo, "Duración:", rutina.duracion);

        const fecha = new Date(rutina.fecha);
        const dia = fecha.toLocaleDateString("es-CR", { weekday: "long" });
        const calorias = calcularCalorias(rutina, peso_kg);

        console.log(`Día: ${dia}, Calorías: ${calorias}`);

        resumen[dia] = (resumen[dia] || 0) + calorias;
        });



      const diasOrdenados = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
      const labels = diasOrdenados;
      const valores = diasOrdenados.map((dia) => Math.round(resumen[dia] || 0));

      console.log("Labels:", labels);
      console.log("Valores:", valores);

      setDatosGrafico({
        labels,
        datasets: [
          {
            label: "Calorías quemadas",
            data: valores,
            backgroundColor: "#f87171",
            fill: true,
            tension: 0.4,
          },
        ],
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
      <h2 className="text-2xl font-bold text-red-600 mb-1">Calorías por día</h2>
      <p className="text-gray-500 text-sm mb-4">Resumen semanal</p>
      <Chart type="line" data={datosGrafico} options={opciones} style={{ height: "200px", width: "100%" }} />
    </div>
  );
};

export default CaloriasQuemadasChart;
