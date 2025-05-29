import { useState } from "react";
import authService from "../../services/authService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await authService.signUp(email, password);
      toast.succes("Cuenta creada exitosamente");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Ya existe una cuenta con ese correo");
          break;
        case "auth/invalid-email":
          toast.error("Correo electrónico inválido");
          break;
        case "auth/operation-not-allowed":
          toast.error("Operación no permitida. Contacta al administrador.");
          break;
        case "auth/weak-password":
          toast.error(
            "La contraseña es demasiado débil. Debe tener al menos 6 caracteres."
          );
          break;
        default:
          toast.error("Error al crear la cuenta");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Imagen a la izquierda */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519915265210-e80fa5b052be?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        {/* Imagen de fondo */}
      </div>

      {/* Formulario a la derecha */}
      <div className="w-full md:w-1/2 flex flex-col bg-white relative">
        {/* Título arriba centrado */}
        <div className="w-full text-center py-6">
          <Link to={'/'}>
            <h1 className="text-5xl text-red-500 font-bold">Vitality</h1>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <form onSubmit={handleRegister} className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              Crear Cuenta
            </h2>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Registrarse
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-red-500 hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
