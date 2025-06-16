// src/pages/RegistroObjetivos.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import toast from "react-hot-toast";

export default function PerfilPaso3() {
  const { state } = useLocation();
  const { uid } = state || {};
  const navigate = useNavigate();

useEffect(() => {
  if (!uid) {
    toast.error("No podés acceder sin completar el paso anterior");
    navigate("/register/perfil", { replace: true });
  }
}, [uid, navigate]);


  const objetivosDisponibles = [
    "Bajar de peso",
    "Ganar masa muscular",
    "Mejorar resistencia",
    "Tonificar",
    "Salud general",
    "Prepararse para una competencia",
  ];

  const [seleccionados, setSeleccionados] = useState([]);

  const toggleObjetivo = (objetivo) => {
    setSeleccionados((prev) =>
      prev.includes(objetivo)
        ? prev.filter((o) => o !== objetivo)
        : [...prev, objetivo]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uid || seleccionados.length === 0) {
      toast.error("Seleccioná al menos un objetivo");
      return;
    }

    try {
      await updateDoc(doc(db, "usuarios", uid), {
        objetivos: seleccionados,
      });

      toast.success("¡Registro completo!");
      navigate("/progreso"); // o cualquier ruta final
    } catch (error) {
      console.error("Error al guardar objetivos:", error);
      toast.error("Error al guardar tus objetivos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded shadow p-6">
        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="bg-red-500 h-2 rounded" style={{ width: "100%" }} />
          </div>
          <p className="text-sm text-gray-600 text-right mt-1">Paso 3 de 3</p>
        </div>

        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
          ¿Cuáles son tus objetivos?
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {objetivosDisponibles.map((objetivo) => (
              <label
                key={objetivo}
                className={`cursor-pointer border rounded px-4 py-2 text-sm ${
                  seleccionados.includes(objetivo)
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  value={objetivo}
                  checked={seleccionados.includes(objetivo)}
                  onChange={() => toggleObjetivo(objetivo)}
                  className="hidden"
                />
                {objetivo}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          >
            Finalizar registro
          </button>
        </form>
      </div>
    </div>
  );
}
