import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import "chart.js/auto";

const MetaAguaChart = () => {
  const [aguaHoy, setAguaHoy] = useState(0);
  const objetivo = 2000;

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const hoy = new Date().toISOString().split("T")[0];
    const db = getDatabase();
    const refAgua = ref(db, "agua");

    onValue(refAgua, snapshot => {
      const datos = snapshot.val();
      let totalHoy = 0;

      Object.values(datos || {}).forEach(item => {
        if (item.uid === user.uid && item.fecha?.startsWith(hoy)) {
          totalHoy += parseInt(item.ml || 0);
        }
      });

      setAguaHoy(totalHoy);
    });
  }, []);

  const porcentaje = Math.min((aguaHoy / objetivo) * 100, 100);

  const data = {
    labels: ["Tomado", "Restante"],
    datasets: [
      {
        data: [aguaHoy, Math.max(objetivo - aguaHoy, 0)],
        backgroundColor: ["#06b6d4", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => `${context.label}: ${context.raw} ml`,
        },
      },
    },
  };
  const meta = 2000; // Objetivo de consumo de agua en ml


return (
  <div className="w-full h-full max-w-md bg-white shadow-xl rounded-2xl p-4  text-left">
    <h2 className="text-2xl font-bold text-red-500 mb-1">Meta de Agua</h2>
    <p className="text-gray-500 text-sm mb-4">Consumo de agua diario en mililitros</p>
    <div className="flex justify-center items-center" style={{ height: "190px" }}>
      <Doughnut data={data} options={options} />
    </div>
    <p className="text-sm text-gray-600 mt-4 text-center">
      {aguaHoy} ml / {meta} ml
    </p>
  </div>
);

};

export default MetaAguaChart;
