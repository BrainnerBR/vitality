import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';


const PerfilPaso2 = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const{ email, uid } = state || {};
    
    useEffect(() => {
        if(!uid || !email) {
            toast.error("No podes acceder sin completar el paso Anterior");
            navigate("/register", {replace: true})
        }
    }, [uid, email, navigate]);
    
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        sexo: "ND",
        peso_kg: "",
        altura_cm: "",
        frecuencia_semanal: "",
        nivel_fitness: "principiante",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!uid || !email) {
            toast.error("Error de Sesion, Vuelve a iniciar");
            return;
        }

        try{
            await setDoc(doc(db, "usuarios", uid), {
                email,
                ...formData,
                peso_kg: Number(formData.peso_kg),
                altura_cm: Number(formData.altura_cm),
                frecuencia_semanal: Number(formData.frecuencia_semanal),
                fecha_registro: serverTimestamp(),
            });
            toast("Perfil Guardado con Exito");
            navigate('/register/objetivos', {state: {uid} });
        } catch(error){
            console.log('Error al guardar perfil', error);
            toast.error("No se pudo guardar el perfil");
        }
    };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-5 rounded ">
        <div className='mb-6'>
            <div className="w-full bg-gray-200 h-2 rounded">
             <div className="bg-red-500 h-2 rounded" style={{ width: "66%" }} />
            </div>
            <p className='text-sm text-gray-600 text-right mt-1'>Paso 2 de 3</p>
        </div>

        <h2 className='text-2xl font-bold text-red-500 mb-6 text-center'>Tu perfil personal</h2>
<form onSubmit={handleSubmit}>
          {/* Campos de texto */}
          {[
            { name: "nombre", placeholder: "Nombre" },
            { name: "apellido", placeholder: "Apellido" },
            { name: "fecha_nacimiento", type: "date", placeholder: "Fecha de nacimiento" },
            { name: "peso_kg", type: "number", placeholder: "Peso (kg)" },
            { name: "altura_cm", type: "number", placeholder: "Altura (cm)" },
          ].map(({ name, type = "text", placeholder }) => (
            <div className="mb-4" key={name}>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}

          {/* Select: sexo */}
          <div className="mb-4">
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="ND">Sexo no definido</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          {/* Select: frecuencia semanal */}
          <div className="mb-4">
            <select
              name="frecuencia_semanal"
              value={formData.frecuencia_semanal}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Frecuencia semanal</option>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "vez" : "veces"} por semana
                </option>
              ))}
            </select>
          </div>

          {/* Select: nivel fitness */}
          <div className="mb-4">
            <select
              name="nivel_fitness"
              value={formData.nivel_fitness}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          >
            Continuar 
          </button>
        </form>
      </div>
    </div>
  );
}

export default PerfilPaso2;
