import { useState } from 'react';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authService.login(email, password);
      toast.success('Sesión iniciada correctamente');
      navigate('/progreso')
    } catch (err) {
      console.log(err.code)
      switch(err.code) {
        case 'auth/user-not-found':
          toast.error("Usuario no encontrado");
          break;
        case 'auth/wrong-password': 
          toast.error("Contraseña incorrecta");
          break;
        case 'auth/invalid-credential' :
          toast.error('Credenciales Invalidos');
          break;
        case 'auth/invalid-email':
          toast.error('Correo electrónico inválido');
          break;
        default:
          toast.error("Error al iniciar Sesion")
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda con encabezado y formulario */}
      <div className="w-full md:w-1/2 flex flex-col bg-white">
        {/* Encabezado arriba */}
        <div className="w-full text-center py-6">
          <Link to={'/progreso'}>
            <h1 className="text-5xl text-red-500 font-bold">Vitality</h1>
          </Link>
        </div>

        {/* Formulario centrado verticalmente */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Iniciar Sesión</h2>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Ingresar
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-red-500 hover:underline font-medium">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Columna derecha con imagen */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1455853828816-0c301a011711?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      ></div>
    </div>
  );
}
