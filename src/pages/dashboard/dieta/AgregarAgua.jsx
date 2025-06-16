import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";
import toast from "react-hot-toast";

const AgregarAgua = () => {
  const [vasos, setVasos] = useState(0);
  const [ml, setMl] = useState(0);
  const [totalAgua, setTotalAgua] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const refAgua = ref(db, "agua");
    const hoy = new Date().toISOString().split("T")[0];

    onValue(refAgua, (snapshot) => {
      const data = snapshot.val();
      const lista = Object.values(data || {}).filter(
        (item) => item.uid === user.uid && item.fecha?.startsWith(hoy)
      );

      const suma = lista.reduce((acc, item) => acc + (parseFloat(item.ml) || 0), 0);
      setTotalAgua(suma);
    });
  }, []);

  const handleGuardar = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const mlTotal = vasos * 250 + parseFloat(ml);
    if (mlTotal <= 0) return toast.error("Debe agregar agua válida");

    try {
      await push(ref(getDatabase(), "agua"), {
        uid: user.uid,
        fecha: new Date().toISOString(),
        vasos,
        ml: mlTotal,
      });
      toast.success("Registro de agua guardado");
      setVasos(0);
      setMl(0);
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Izquierda - Formulario */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Registrar Agua</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Cantidad de vasos (250ml c/u)</label>
          <input
            type="number"
            value={vasos}
            onChange={(e) => setVasos(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Adicional (ml)</label>
          <input
            type="number"
            value={ml}
            onChange={(e) => setMl(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleGuardar}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
        >
          Guardar Agua
        </button>
      </div>

      {/* Derecha - Agua Total */}
      <div className="bg-blue-50 p-6 rounded shadow text-center flex flex-col justify-center">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Consumo Diario</h2>
        <div className="text-5xl font-bold text-blue-600 mb-2">{totalAgua} ml</div>
        <p className="text-gray-600">Total de agua registrada hoy</p>
      </div>
    </div>
  );
};

export default AgregarAgua;
