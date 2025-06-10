import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBars, FaChartLine, FaDumbbell, FaAppleAlt,
  FaStopwatch, FaCog,
  FaHome,
} from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Mi Progreso', icon: <FaChartLine />, to: '/progreso' },
    { label: 'Ejercicios', icon: <FaDumbbell />, to: '/ejercicios' },
    { label: 'Dieta', icon: <FaAppleAlt />, to: '/dieta' },
    { label: 'Timer', icon: <FaStopwatch />, to: '/timer' },
    { label: 'Configuración', icon: <FaCog />, to: '/configuracion' },
  ];

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.log('Error al cerrar Sesion', error)
      toast.error('Error al Cerrar Sesion', error)
    })
  }

  return (
    <div
      className={`flex flex-col h-screen bg-[#0F172A] text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo y toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold text-red-500">Vitality</h1>}
        <button onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Menú principal */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-3 py-2 rounded cursor-pointer transition ${
                isActive ? 'bg-red-600' : 'hover:bg-gray-700 transition'
              }`
            }
          >
            <div className="text-lg">{icon}</div>
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer motivacional */}
      <div className="border-t border-gray-700 px-2 pt-4 pb-6 text-sm text-gray-400">
        <button onClick={handleLogout} className='w-full text-left text-white hover:text-red-500 hover:underline text-sm'>Cerrar Sesion</button>
      </div>
    </div>
  );
}
