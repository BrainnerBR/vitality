import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { buscarComida, buscarSugerencias } from "../../services/dietaAPI";
import toast from "react-hot-toast";

const Dieta = () => {
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [comidasParaGuardar, setComidasParaGuardar] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    calorias: "",
    proteinas: "",
    carbohidratos: "",
    grasas: "",
  });

  const handleBuscar = async () => {
    if (!busqueda.trim()) return toast.error("Escribí una comida");

    const resultado = await buscarComida(busqueda);
    if (resultado) {
      setFormData({
        nombre: resultado.food_name,
        calorias: resultado.nf_calories,
        proteinas: resultado.nf_protein,
        carbohidratos: resultado.nf_total_carbohydrate,
        grasas: resultado.nf_total_fat,
      });
      toast.success("Comida encontrada ✅");
    } else {
      toast.error("No se encontró la comida 😕");
    }
  };

const guardarComidas = async () => {
  try {
    const batch = comidasParaGuardar.map(async (comida) =>
      await addDoc(collection(db, "comidas"), {
        ...comida,
        calorias: Number(comida.calorias),
        proteinas: Number(comida.proteinas),
        carbohidratos: Number(comida.carbohidratos),
        grasas: Number(comida.grasas),
        fecha: Timestamp.now(),
      })
    );
    await Promise.all(batch);
    toast.success("Todas las comidas se guardaron ✅");
    setComidasParaGuardar([]);
    setFormData({
      nombre: "",
      calorias: "",
      proteinas: "",
      carbohidratos: "",
      grasas: "",
    });
    setBusqueda("");
  } catch (error) {
    console.log("Error al guardar:", error);
    toast.error("Error al guardar");
  }
};


  useEffect(() => {
    const obtenerSugerencias = async () => {
      if(busqueda.length < 2) {
        setSugerencias([]);
        return;
      }
      const resultados = await buscarSugerencias(busqueda);
      setSugerencias(resultados);
    };

    const timer  = setTimeout(obtenerSugerencias, 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

const seleccionarSugerencia = async (nombreComida) => {
  setBusqueda(nombreComida);
  setSugerencias([]); 

  const resultado = await buscarComida(nombreComida);
  if (resultado) {
    const nuevaComida = {
      nombre: resultado.food_name,
      calorias: resultado.nf_calories,
      proteinas: resultado.nf_protein,
      carbohidratos: resultado.nf_total_carbohydrate,
      grasas: resultado.nf_total_fat,
    };
    setFormData(nuevaComida);
    setComidasParaGuardar((prev) => [...prev, nuevaComida]);
    setBusqueda('');
    toast.success("Comida agregada a la lista");
  } else {
    toast.error("No se pudo obtener la información");
  }
};


  return (
  <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">Registrar comida</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Columna izquierda: Input y sugerencias */}
      <div className="relative z-20">
        <div className="flex gap-2">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej: 1 taza de arroz con pollo"
            className="input-style w-full"
          />
          <button
            onClick={handleBuscar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Buscar
          </button>
        </div>

        {sugerencias.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-48 overflow-y-auto">
            {sugerencias.map((sug, idx) => (
              <li
                key={idx}
                onClick={() => seleccionarSugerencia(sug)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {sug}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Columna derecha: Lista de comidas */}
      {comidasParaGuardar.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Lista para guardar
          </h3>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {comidasParaGuardar.map((comida, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded shadow-sm border border-gray-200"
              >
                <p className="font-medium">{comida.nombre}</p>
                <p className="text-sm text-gray-600">Calorías: {comida.calorias}</p>
                <p className="text-sm text-gray-600">Proteínas: {comida.proteinas}</p>
                <p className="text-sm text-gray-600">Carbohidratos: {comida.carbohidratos}</p>
                <p className="text-sm text-gray-600">Grasas: {comida.grasas}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={guardarComidas}
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
          >
            Guardar comidas
          </button>
        </div>
      )}
    </div>
  </div>
);

};

export default Dieta;
