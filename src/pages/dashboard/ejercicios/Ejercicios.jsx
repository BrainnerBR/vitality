import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import toast from "react-hot-toast";
import { push, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { realtimeDB } from "../../../services/firebaseConfig";

import { FaPlusCircle, FaHistory, FaCalendarAlt } from "react-icons/fa";


import ejerciciosData from "../../../services/ejercicios.json";
import HistorialEjercicios from "./HistorialEjercicios";
import EjerciciosSemana from "./EjerciciosSemana";

const Ejercicios = () => {
  const [vista, setVista] = useState("agregar");
  const [tipo, setTipo] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [sets, setSets] = useState("");
  const [peso, setPeso] = useState("");
  const [duracion, setDuracion] = useState("");
  const [sugerenciasEjercicio, setSugerenciasEjercicio] = useState([]);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
  const [musculo, setMusculo] = useState("");
  const [tiposSugeridos, setTiposSugeridos] = useState([]);
  const tiposBase = ["cardio", "fuerza", "flexibilidad"];

  const buscarTipo = (event) => {
    const filtro = event.query.toLowerCase();
    const resultados = tiposBase.filter((tipo) =>
      tipo.toLowerCase().includes(filtro)
    );
    setTiposSugeridos(resultados);
  };

const buscarEjercicio = (event) => {
  const query = event.query?.toLowerCase() || "";
  let resultados = [];

  if (tipo && ejerciciosData.length > 0) {
    resultados = ejerciciosData
      .filter(
        (ej) =>
          ej.tipo.toLowerCase() === tipo.toLowerCase() &&
          ej.nombre.toLowerCase().includes(query)
      )
      .map((ej) => ({
        name: ej.nombre,
        musculo: ej.musculo,
      }));
  }

  console.log("Sugerencias encontradas:", resultados);
  setSugerenciasEjercicio(resultados.slice(0, 10));
};


const handleSeleccionEjercicio = (e) => {
  const ejercicio = e.value;
  setEjercicioSeleccionado(ejercicio);
  setMusculo(ejercicio.musculo);
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert("Usuario no autenticado");

if (!ejercicioSeleccionado?.name) {
  return toast.error("Por favor selecciona un ejercicio.");
}

        const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado"
    ];
    const diaActual = diasSemana[new Date().getDay()];


const rutina = {
  tipo,
  ejercicio: ejercicioSeleccionado.name,
  fecha: new Date().toISOString(),
  dia: diaActual,
  musculo,
  ...(tipo === "fuerza" && { repeticiones, sets, peso }),
  ...(tipo === "cardio" && { duracion }),
  uid: user.uid,
};


    try {
      await push(ref(realtimeDB, "rutinas"), rutina);
      toast.success("Rutina guardada correctamente");

      setTipo("");
      setEjercicioSeleccionado(null);
      setRepeticiones("");
      setSets("");
      setPeso("");
      setDuracion("");
      setMusculo("");
    } catch (error) {
      console.error("Error al guardar rutina:", error);
      alert("Error al guardar rutina");
    }
  };

  return (
    <div>
      {/* Navegación entre vistas */}
      <nav className="text-white px-4 py-2 mb-4">
  <div className="flex gap-4 justify-left">
    <button
      onClick={() => setVista("agregar")}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        vista === "agregar" ? "bg-red-500" : "bg-gray-700"
      } hover:bg-red-500 transition`}
    >
      <FaPlusCircle />
      Agregar Rutina
    </button>
    <button
      onClick={() => setVista("historial")}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        vista === "historial" ? "bg-red-500" : "bg-gray-700"
      } hover:bg-red-500 transition`}
    >
      <FaHistory />
      Historial de Ejercicios
    </button>
    <button
      onClick={() => setVista("plan")}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        vista === "plan" ? "bg-red-500" : "bg-gray-700"
      } hover:bg-red-500 transition`}
    >
      <FaCalendarAlt />
      Mi Semana
    </button>
  </div>
</nav>


      {/* Vista Agregar Rutina */}
      {vista === "agregar" && (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Agregar nueva rutina
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tipo de ejercicio
              </label>
              <AutoComplete
                value={tipo}
                suggestions={tiposSugeridos}
                completeMethod={buscarTipo}
                onChange={(e) => {
                  setTipo(e.value);
                  setEjercicioSeleccionado(null);
                }}
                placeholder="Seleccionar tipo"
                className="w-full"
                inputClassName="w-full p-2 border border-gray-300 rounded"
                dropdown
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ejercicio
              </label>
                  <AutoComplete
                    value={ejercicioSeleccionado}
                    suggestions={sugerenciasEjercicio}
                    completeMethod={buscarEjercicio}
                    field="name"
                    onChange={handleSeleccionEjercicio}
                    placeholder="Buscar ejercicio"
                    className="w-full"
                    inputClassName="w-full p-2 border border-gray-300 rounded"
                    dropdown
                    itemTemplate={(item) => (
                      <div>
                        {item.name} <span className="text-gray-400 text-sm">({item.musculo})</span>
                      </div>
                    )}
                  />



              {musculo && (
              <p className="text-sm text-gray-600">
                Músculo detectado: <strong>{musculo}</strong>
              </p>
            )}

            </div>

            {tipo === "fuerza" && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Repeticiones
                  </label>
                  <input
                    type="number"
                    value={repeticiones}
                    onChange={(e) => setRepeticiones(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Sets
                  </label>
                  <input
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}

            {tipo === "cardio" && (
              <div>
                <label className="block text-gray-700 font-medium">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Guardar rutina
            </button>
          </form>
        </div>
      )}

      {/* Vista Historial */}
      {vista === "historial" && <HistorialEjercicios />}

      {/* Vista Semana */}
      {vista === "plan" && <EjerciciosSemana />}
    </div>
  );
};

export default Ejercicios;
