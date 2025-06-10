import { useState } from "react";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const userCredential = await authService.register(formData.email, formData.password);
      toast.success("Cuenta creada");
      // Redirigir al paso 2 y pasar UID o email
      navigate("/register/perfil", {
        state: { email: formData.email, uid: userCredential.user.uid },
      });
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Ese correo ya está en uso");
          break;
        case "auth/invalid-email":
          toast.error("Correo inválido");
          break;
        case "auth/weak-password":
          toast.error("Contraseña débil (mínimo 6 caracteres)");
          break;
        default:
          console.log(error)
          toast.error("Error al crear la cuenta");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
          Crear Cuenta
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Continuar
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}
