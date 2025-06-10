import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

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

      const ordenadas = lista.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );

      setRutinas(ordenadas);
    });
  }, []);

  const agruparRutinasPorDia = (rutinas) => {
    const diasSemana = {
      lunes: [],
      martes: [],
      miércoles: [],
      jueves: [],
      viernes: [],
      sábado: [],
    };

    rutinas.forEach((rutina) => {
      const dia = rutina.dia?.toLowerCase();
      if (dia && diasSemana[dia]) {
        diasSemana[dia].push(rutina);
      }
    });

    return diasSemana;
  };

  const getColorClase = (musculo) => {
    switch (musculo.toLowerCase()) {
      case "pecho": return "bg-red-100 border-red-400";
      case "espalda": return "bg-blue-100 border-blue-400";
      case "piernas": return "bg-green-100 border-green-400";
      case "brazos": return "bg-yellow-100 border-yellow-400";
      case "abdomen": return "bg-purple-100 border-purple-400";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Plan semanal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-4">
          {Object.entries(agruparRutinasPorDia(rutinas)).map(([dia, ejercicios]) => {
            const musculo = ejercicios[0]?.musculo || "Descanso";
            return (
              <div
                key={dia}
                className={`rounded-lg shadow p-3 transition duration-300 ${getColorClase(musculo)} border`}
              >
                <div className="font-semibold text-center capitalize mb-2">{dia}</div>
                <div className="font-bold text-center mb-2">{musculo}</div>
                <div className="space-y-2">
                  {ejercicios.map((ej, i) => (
                    <div key={i} className="bg-white rounded p-2 shadow text-sm">
                      <div className="font-medium text-gray-700">{ej.ejercicio}</div>
                      <div className="text-gray-500">
                        {ej.tipo === "fuerza"
                          ? `${ej.sets}x${ej.repeticiones} (${ej.peso}kg)`
                          : ej.tipo === "cardio"
                          ? `${ej.duracion} min`
                          : "Flexibilidad"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EjerciciosSemana;
