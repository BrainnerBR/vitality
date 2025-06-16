import React, { useEffect, useState } from "react";
import { FaDumbbell, FaUtensils, FaWater, FaCalendarCheck, FaFire } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import retos from '../../../services/retosSemanales.json';

const iconos = {
  ejercicio: <FaDumbbell className="text-xl text-blue-600" />,
  comida: <FaUtensils className="text-xl text-green-600" />,
  agua: <FaWater className="text-xl text-cyan-500" />,
  consistencia: <FaCalendarCheck className="text-xl text-purple-600" />,
  calorias: <FaFire className="text-xl text-orange-500" />,
  mixto: <FaCalendarCheck className="text-xl text-pink-500" />
};

const RetosSemanales = () => {
  const [progreso, setProgreso] = useState({});
  const [progresoDiario, setProgresoDiario] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const hoy = new Date().toISOString().split("T")[0];

    const progresoTemp = {
      ejercicio: new Set(),
      comida: new Set(),
      agua: new Set(),
      consistencia: new Set()
    };

    const diasPrevios = JSON.parse(localStorage.getItem("diasIngresados") || "[]");
    if (!diasPrevios.includes(hoy)) {
      diasPrevios.push(hoy);
      localStorage.setItem("diasIngresados", JSON.stringify(diasPrevios));
    }
    progresoTemp.consistencia = new Set(diasPrevios);

    const promesas = [];

    promesas.push(new Promise(resolve => {
      onValue(ref(db, "agua"), snapshot => {
        const agua = Object.values(snapshot.val() || {});
        const diasAgua = new Set();
        agua.forEach(a => {
          if (a.uid === user.uid && a.fecha) {
            const dia = a.fecha.split("T")[0];
            diasAgua.add(dia);
          }
        });
        progresoTemp.agua = diasAgua;
        resolve();
      }, { onlyOnce: true });
    }));

    promesas.push(new Promise(resolve => {
      onValue(ref(db, "comidas"), snapshot => {
        const comidas = Object.values(snapshot.val() || {});
        const comidasPorDia = {};
        comidas.forEach(c => {
          if (c.uid === user.uid && c.fecha) {
            const dia = c.fecha.split("T")[0];
            if (!comidasPorDia[dia]) comidasPorDia[dia] = new Set();
            comidasPorDia[dia].add(c.tipo);
          }
        });
        const diasValidos = Object.entries(comidasPorDia)
          .filter(([_, tipos]) => tipos.size >= 3)
          .map(([dia]) => dia);
        progresoTemp.comida = new Set(diasValidos);
        resolve();
      }, { onlyOnce: true });
    }));

    promesas.push(new Promise(resolve => {
      onValue(ref(db, "rutinas"), snapshot => {
        const rutinas = Object.values(snapshot.val() || {});
        rutinas.forEach(r => {
          if (r.uid === user.uid && r.fecha) {
            const dia = r.fecha.split("T")[0];
            progresoTemp.ejercicio.add(dia);
          }
        });
        resolve();
      }, { onlyOnce: true });
    }));

    Promise.all(promesas).then(() => {
      setProgreso(progresoTemp);
    });

  }, []);

  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    const progresoGuardado = JSON.parse(localStorage.getItem("retosProgreso") || "{}");

    retos.forEach((reto) => {
      if (!progresoGuardado[reto.id]) {
        progresoGuardado[reto.id] = [];
      }

      const dias = progreso[reto.tipo];
      if (dias?.has(hoy) && !progresoGuardado[reto.id].includes(hoy)) {
        progresoGuardado[reto.id].push(hoy);
      }
    });

    localStorage.setItem("retosProgreso", JSON.stringify(progresoGuardado));
    setProgresoDiario(progresoGuardado);
  }, [progreso]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Retos Semanales</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {retos.slice(0, 4).map(reto => {
          const diasCompletados = progresoDiario[reto.id]?.length || 0;

          return (
            <div key={reto.id} className="bg-gray-50 p-4 rounded shadow border">
              <div className="flex items-center gap-3 mb-2">
                {iconos[reto.tipo]}
                <h3 className="text-lg font-semibold text-gray-800">{reto.nombre}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{reto.descripcion}</p>
              <div className="text-sm font-medium text-right text-gray-700">
                Días completados: <span className="text-red-500">{diasCompletados}</span> / {reto.meta.dias}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RetosSemanales;
