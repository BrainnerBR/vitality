import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { FaHeartbeat, FaDumbbell, FaPrayingHands } from "react-icons/fa";

const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const iconoPorTipo = {
  fuerza: <FaDumbbell className="inline-block mr-1 text-red-500" />,
  cardio: <FaHeartbeat className="inline-block mr-1 text-green-500" />,
  flexibilidad: <FaPrayingHands className="inline-block mr-1 text-indigo-500" />,
};


const colorMusculo = (musculo) => {
  const colores = {
    pecho: "bg-red-200 text-red-800",
    espalda: "bg-blue-200 text-blue-800",
    piernas: "bg-green-200 text-green-800",
    bíceps: "bg-purple-200 text-purple-800",
    tríceps: "bg-pink-200 text-pink-800",
    hombros: "bg-yellow-200 text-yellow-800",
    abdominales: "bg-orange-200 text-orange-800",
    general: "bg-gray-200 text-gray-700",
  };
  return colores[musculo?.toLowerCase()] || "bg-gray-100 text-gray-500";
};

const EjerciciosSemana = () => {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const rutinasRef = ref(db, "rutinas");

    onValue(rutinasRef, (snapshot) => {
      const data = snapshot.val();
      const lista = [];

      for (let id in data) {
        if (data[id].uid === user.uid) {
          lista.push({ id, ...data[id] });
        }
      }

      setRutinas(lista);
    });
  }, []);

  const agruparRutinas = () => {
    const agrupado = {};
    diasSemana.forEach(dia => agrupado[dia] = []);

    rutinas.forEach(rut => {
      const dia = rut.dia?.toLowerCase();
      if (agrupado[dia]) agrupado[dia].push(rut);
    });

    return agrupado;
  };

  const rutinasPorDia = agruparRutinas();

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Resumen semanal de entrenamiento</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {diasSemana.map((dia) => {
          const ejercicios = rutinasPorDia[dia];
          const musculos = [...new Set(ejercicios.map(ej => ej.musculo))];

          return (
            <div key={dia} className="bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition">
              <div className="mb-3">
                <h3 className="text-xl font-semibold capitalize text-red-600">{dia}</h3>
              </div>

              {musculos.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-3">
                  {musculos.map((mus, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded-full font-medium ${colorMusculo(mus)}`}>
                      {mus}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">Descanso</p>
              )}

              <ul className="space-y-2">
                {ejercicios.map((ej, i) => (
                  <li key={i} className="bg-gray-50 p-2 rounded-md border text-sm">
                    <div className="text-gray-800 font-medium flex items-center">
                      {iconoPorTipo[ej.tipo?.toLowerCase()] || null}
                      {ej.ejercicio}
                    </div>
                    <div className="text-gray-500">
                      {ej.tipo === "fuerza"
                        ? `${ej.sets}x${ej.repeticiones} (${ej.peso}kg)`
                        : ej.tipo === "cardio"
                        ? `${ej.duracion} min`
                        : "Flexibilidad"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EjerciciosSemana;
