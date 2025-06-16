import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import correcto


const colores = {
  calorias: ["#ff595e", "#ffb5b0"],
  proteinas: ["#1982c4", "#a1cfff"],
  carbohidratos: ["#6a994e", "#b7e4c7"],
  grasas: ["#ffca3a", "#ffe99e"]
};

const ResumenNutricional = () => {
  const [data, setData] = useState(null);

 useEffect(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const dbRTDB = getDatabase();
  const refComidas = ref(dbRTDB, "comidas");

  const dbFirestore = getFirestore();
  const refUsuario = doc(dbFirestore, "usuarios", user.uid);

  getDoc(refUsuario).then((snapshotUsuario) => {
    if (!snapshotUsuario.exists()) {
      console.warn("❌ Usuario no encontrado en Firestore");
      return;
    }

    const usuario = snapshotUsuario.data();
    console.log("📦 Usuario desde Firestore:", usuario);

    const { peso_kg, altura_cm, fecha_nacimiento, sexo, objetivos } = usuario;

    if (!peso_kg || !altura_cm || !fecha_nacimiento || !sexo || !objetivos?.length) {
      console.warn("⚠️ Datos de usuario incompletos", usuario);
      return;
    }

    const hoy = new Date();
    const nacimiento = new Date(fecha_nacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();

    const objetivoTexto = objetivos[0]?.toLowerCase().includes("bajar")
      ? "bajar"
      : objetivos[0]?.toLowerCase().includes("subir")
      ? "subir"
      : "mantener";

    const sexoNormalizado = sexo.toLowerCase().startsWith("m")
      ? "masculino"
      : "femenino";

    const calcularCaloriasObjetivo = ({ peso_kg, altura_cm, edad, sexo, objetivo }) => {
      let tmb;
      if (sexo === "masculino") {
        tmb = 88.36 + (13.4 * peso_kg) + (4.8 * altura_cm) - (5.7 * edad);
      } else {
        tmb = 447.6 + (9.2 * peso_kg) + (3.1 * altura_cm) - (4.3 * edad);
      }

      const factores = {
        mantener: 1.55,
        bajar: 1.3,
        subir: 1.7,
      };

      const factor = factores[objetivo] || 1.55;
      return Math.round(tmb * factor);
    };

    const caloriasObjetivo = calcularCaloriasObjetivo({
      peso_kg,
      altura_cm,
      edad,
      sexo: sexoNormalizado,
      objetivo: objetivoTexto,
    });

    // 🔁 Ahora leemos las comidas desde Realtime Database
    onValue(refComidas, (snapshotComidas) => {
      const todas = snapshotComidas.val();
      const hoyStr = new Date().toISOString().split("T")[0];

      let calorias = 0,
        proteinas = 0,
        carbohidratos = 0,
        grasas = 0;

      Object.values(todas || {}).forEach((item) => {
        if (item.uid === user.uid && item.fecha?.startsWith(hoyStr)) {
          calorias += parseFloat(item.calorias || 0);
          proteinas += parseFloat(item.proteinas || 0);
          carbohidratos += parseFloat(item.carbohidratos || 0);
          grasas += parseFloat(item.grasas || 0);
        }
      });

      setData({
        caloriasConsumidas: Math.round(calorias),
        caloriasObjetivo,

        proteinasConsumidas: Math.round(proteinas),
        proteinasObjetivo: 150,

        carbohidratosConsumidos: Math.round(carbohidratos),
        carbohidratosObjetivo: 250,

        grasasConsumidas: Math.round(grasas),
        grasasObjetivo: 70,
      });
    });
  });
}, []);


  const renderGrafico = (nombre, usado, restante, coloresSet) => {
    const total = usado + restante;
    const chartData = [
      { name: "Consumido", value: usado },
      { name: "Restante", value: restante < 0 ? 0 : restante }
    ];

    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{nombre}</h3>
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={coloresSet[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-sm mt-1">
          <strong>{usado}</strong> / {total}
        </div>
      </div>
    );
  };

  if (!data) {
    return (
      <div className="text-center text-gray-500 mt-8">Cargando resumen nutricional...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-white rounded-xl shadow-xl">
      {renderGrafico(
        "Calorías",
        data.caloriasConsumidas,
        data.caloriasObjetivo - data.caloriasConsumidas,
        colores.calorias
      )}
      {renderGrafico(
        "Proteínas (g)",
        data.proteinasConsumidas,
        data.proteinasObjetivo - data.proteinasConsumidas,
        colores.proteinas
      )}
      {renderGrafico(
        "Carbohidratos (g)",
        data.carbohidratosConsumidos,
        data.carbohidratosObjetivo - data.carbohidratosConsumidos,
        colores.carbohidratos
      )}
      {renderGrafico(
        "Grasas (g)",
        data.grasasConsumidas,
        data.grasasObjetivo - data.grasasConsumidas,
        colores.grasas
      )}
    </div>
  );
};

export default ResumenNutricional;
