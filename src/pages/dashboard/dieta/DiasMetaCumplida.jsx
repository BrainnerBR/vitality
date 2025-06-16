import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const DiasMetaCumplida = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const dbRealtime = getDatabase();
    const dbFirestore = getFirestore();

    const fetchDatos = async () => {
      const docRef = doc(dbFirestore, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      const userData = docSnap.data();
      const { peso_kg, altura_cm, fecha_nacimiento, sexo, objetivos } = userData;

      if (!peso_kg || !altura_cm || !fecha_nacimiento || !sexo || !objetivos?.length) return;

      const hoy = new Date();
      const nacimiento = new Date(fecha_nacimiento);
      const edad = hoy.getFullYear() - nacimiento.getFullYear();

      const objetivoTexto = objetivos[0]?.toLowerCase().includes("bajar")
        ? "bajar"
        : objetivos[0]?.toLowerCase().includes("subir")
        ? "subir"
        : "mantener";

      const sexoNormalizado = sexo.toLowerCase().startsWith("m") ? "masculino" : "femenino";

      const calcularMetaCalorias = () => {
        let tmb = sexoNormalizado === "masculino"
          ? 88.36 + (13.4 * peso_kg) + (4.8 * altura_cm) - (5.7 * edad)
          : 447.6 + (9.2 * peso_kg) + (3.1 * altura_cm) - (4.3 * edad);

        const factores = { mantener: 1.55, bajar: 1.3, subir: 1.7 };
        return Math.round(tmb * (factores[objetivoTexto] || 1.55));
      };

      const metaCalorias = calcularMetaCalorias();
      const metaAgua = peso_kg * 35; // ml por kg corporal

      const refComidas = ref(dbRealtime, "comidas");
      const refAgua = ref(dbRealtime, "agua");

      let dias = {};

      onValue(refComidas, (snapshot) => {
        Object.values(snapshot.val() || {}).forEach((item) => {
          if (item.uid === user.uid) {
            const fecha = item.fecha?.split("T")[0];
            dias[fecha] = dias[fecha] || { calorias: 0, agua: 0 };
            dias[fecha].calorias += parseFloat(item.calorias || 0);
          }
        });

        onValue(refAgua, (snapAgua) => {
          Object.values(snapAgua.val() || {}).forEach((item) => {
            if (item.uid === user.uid) {
              const fecha = item.fecha?.split("T")[0];
              dias[fecha] = dias[fecha] || { calorias: 0, agua: 0 };
              dias[fecha].agua += parseFloat(item.ml || 0);
            }
          });

          const resultados = Object.entries(dias).map(([fecha, valores]) => ({
            fecha,
            cumpleCalorias: valores.calorias >= metaCalorias,
            cumpleAgua: valores.agua >= metaAgua,
          }));

          setDatos(resultados);
          setLoading(false);
        });
      });
    };

    fetchDatos();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Días con metas cumplidas</h2>
      <ul className="text-sm space-y-2">
        {datos.map((dia, i) => (
          <li key={i} className="flex justify-between border-b py-1">
            <span className="font-medium">{dia.fecha}</span>
            <span>
              {dia.cumpleCalorias && <span className="text-green-600">🔥 Calorías </span>}
              {dia.cumpleAgua && <span className="text-blue-600">💧 Agua</span>}
              {!dia.cumpleCalorias && !dia.cumpleAgua && <span className="text-gray-400">Sin metas</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiasMetaCumplida;
