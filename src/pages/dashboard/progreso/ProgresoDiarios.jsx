import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import ResumenNutricional from "./ResumenNutricional";

const ProgresoDiario = () => {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const uid = user.uid;
    const db = getDatabase();
    const fechaHoy = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const usuarioRef = ref(db, `usuarios/${uid}`);
    const comidasRef = ref(db, "comidas");
    const rutinasRef = ref(db, "rutinas");

    let peso = 70;
    let altura = 170;
    let objetivo = "mantenimiento"; // o "deficit", "ganar"

    let totalComidas = {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0,
    };

    let caloriasEjercicio = 0;

    const calcCaloriasBase = (peso, altura, objetivo) => {
      // Fórmula simple de Harris-Benedict modificada
      const bmr = 10 * peso + 6.25 * altura - 5 * 30 + 5;
      let meta = bmr * 1.4; // Actividad ligera

      if (objetivo === "deficit") meta -= 300;
      else if (objetivo === "ganar") meta += 300;

      return Math.round(meta);
    };

    onValue(usuarioRef, (snap) => {
      const userData = snap.val();
      if (userData) {
        peso = userData.peso || peso;
        altura = userData.altura || altura;
        objetivo = userData.objetivo || objetivo;
      }

      const caloriasObjetivo = calcCaloriasBase(peso, altura, objetivo);
      const proteinasObjetivo = Math.round(peso * 2);
      const carbohidratosObjetivo = Math.round(peso * 4);
      const grasasObjetivo = Math.round(peso * 1);

      onValue(comidasRef, (snapComidas) => {
        const data = snapComidas.val();
        for (let id in data) {
          const comida = data[id];
          if (comida.uid === uid && comida.fecha?.startsWith(fechaHoy)) {
            totalComidas.calorias += comida.calorias || 0;
            totalComidas.proteinas += comida.proteinas || 0;
            totalComidas.carbohidratos += comida.carbohidratos || 0;
            totalComidas.grasas += comida.grasas || 0;
          }
        }

        onValue(rutinasRef, (snapRutinas) => {
          const data = snapRutinas.val();
          for (let id in data) {
            const rutina = data[id];
            if (rutina.uid === uid && rutina.fecha?.startsWith(fechaHoy)) {
              if (rutina.tipo === "cardio" && rutina.duracion) {
                caloriasEjercicio += Math.round((peso * 0.0175) * rutina.duracion * 5);
              } else if (rutina.tipo === "fuerza" && rutina.sets && rutina.repeticiones) {
                caloriasEjercicio += Math.round((rutina.sets * rutina.repeticiones * 0.3));
              }
            }
          }

          // Cálculo final
          const caloriasConsumidasNetas = totalComidas.calorias - caloriasEjercicio;

          setDatos({
            caloriasConsumidas: Math.max(caloriasConsumidasNetas, 0),
            caloriasObjetivo,
            proteinasConsumidas: totalComidas.proteinas,
            proteinasObjetivo,
            carbohidratosConsumidos: totalComidas.carbohidratos,
            carbohidratosObjetivo,
            grasasConsumidas: totalComidas.grasas,
            grasasObjetivo,
          });

          setLoading(false);
        });
      });
    });
  }, []);

  if (loading) return <div className="text-center text-gray-500 mt-8">Cargando progreso...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Resumen Diario</h2>
      <ResumenNutricional data={datos} />
    </div>
  );
};

export default ProgresoDiario;
