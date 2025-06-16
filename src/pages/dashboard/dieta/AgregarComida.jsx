import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../services/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { buscarComida, buscarSugerencias } from "../../../services/dietaAPI";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { AutoComplete } from "primereact/autocomplete";
import AgregarAgua from "./AgregarAgua";
import DiasMetaCumplida from "./DiasMetaCumplida";
import ResumenNutricional from "../progreso/ResumenNutricional";

const AgregarComida = () => {
  const [tipo, setTipo] = useState("desayuno");
  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [comidaSeleccionada, setComidaSeleccionada] = useState(null);
  const [comidasHoy, setComidasHoy] = useState([]);

const inputRef = useRef();
useEffect(() => {
  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSugerencias([]);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


const handleBuscar = async (e) => {
  const texto = e.query.trim();
  if (texto.length === 0) {
    setSugerencias([]);
    return;
  }

  const resultados = await buscarSugerencias(texto);
  setSugerencias(resultados.slice(0, 10));
};

const handleSeleccion = async (e) => {
  const nombre = e.value?.food_name;
  if (!nombre) return;

  setQuery(nombre);

  const comida = await buscarComida(nombre);
  if (comida) {
    setComidaSeleccionada({
      nombre: comida.food_name,
      calorias: comida.nf_calories,
      proteinas: comida.nf_protein,
      carbohidratos: comida.nf_total_carbohydrate,
      grasas: comida.nf_total_fat,
    });
  } else {
    toast.error("No se pudo obtener información nutricional.");
  }
};


const guardarComida = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !comidaSeleccionada) return;

  console.log("Comida a guardar:", comidaSeleccionada); // 👈 Agregá esto

  const data = {
    ...comidaSeleccionada,
    tipo,
    fecha: new Date().toISOString(),
    uid: user.uid,
  };

  try {
    await push(ref(getDatabase(), "comidas"), data);
    toast.success("Comida registrada correctamente");
    setQuery("");
    setComidaSeleccionada(null);
  } catch (err) {
    console.error(err);
    toast.error("Error al guardar comida");
  }
};


  // Cargar comidas del día
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const refComidas = ref(db, "comidas");

    onValue(refComidas, (snapshot) => {
      const data = snapshot.val();
      const hoy = new Date().toISOString().split("T")[0];

      const lista = Object.values(data || {}).filter(
        (item) =>
          item.uid === user.uid &&
          item.fecha?.startsWith(hoy)
      );

      setComidasHoy(lista);
    });
  }, []);

  return (
   <div className="p-4 space-y-8">
  {/* Sección superior: Agregar comida y lista */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Formulario de agregar comida */}
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Agregar Comida</h2>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Tipo de comida</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="desayuno">Desayuno</option>
          <option value="snack">Snack</option>
          <option value="almuerzo">Almuerzo</option>
          <option value="cena">Cena</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Buscar comida</label>
        <AutoComplete
          value={query}
          suggestions={sugerencias}
          completeMethod={handleBuscar}
          onChange={(e) => setQuery(e.value)}
          onSelect={handleSeleccion}
          field="food_name"
          placeholder="Ej: arroz, manzana, pizza..."
          className="w-full"
          inputClassName="w-full p-2 border rounded"
          dropdown
        />
      </div>

      {comidaSeleccionada && (
        <div className="mb-4 text-sm bg-gray-100 p-3 rounded border border-gray-300">
          <p><strong>Nombre:</strong> {comidaSeleccionada.nombre}</p>
          <p><strong>Calorías:</strong> {comidaSeleccionada.calorias} kcal</p>
          <p><strong>Proteínas:</strong> {comidaSeleccionada.proteinas} g</p>
          <p><strong>Carbohidratos:</strong> {comidaSeleccionada.carbohidratos} g</p>
          <p><strong>Grasas:</strong> {comidaSeleccionada.grasas} g</p>
        </div>
      )}

      <button
        onClick={guardarComida}
        disabled={!comidaSeleccionada}
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Guardar Comida
      </button>
    </div>

    {/* Lista de comidas del día */}
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Comidas de Hoy</h2>
      {comidasHoy.length === 0 ? (
        <p className="text-gray-500">Aún no se han registrado comidas hoy.</p>
      ) : (
        <ul className="space-y-3">
          {comidasHoy.map((comida, i) => (
            <li
              key={i}
              className="border rounded p-3 shadow text-sm bg-gray-50"
            >
              <div className="font-semibold capitalize">{comida.tipo} - {comida.nombre}</div>
              <div className="text-gray-600">Calorías: {comida.calorias} kcal</div>
              <div className="text-gray-600">Proteínas: {comida.proteinas} g</div>
              <div className="text-gray-600">Carbohidratos: {comida.carbohidratos} g</div>
              <div className="text-gray-600">Grasas: {comida.grasas} g</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  {/* Sección inferior: Agua y días cumplidos */}
  <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
    <div className="w-full max-w-full">
      <AgregarAgua />
    </div>
    <div className="w-full max-w-full">
      <ResumenNutricional/>
    </div>
  </div>
</div>

  );
};

export default AgregarComida;
