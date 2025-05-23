import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between fixed">
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
        Vitality
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4">
        <Link to="/home" className="block py-2 px-4 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/progreso" className="block py-2 px-4 rounded hover:bg-gray-700">
          Progreso
        </Link>
        <Link to="/estadisticas" className="block py-2 px-4 rounded hover:bg-gray-700">
          Estadísticas
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full py-2 bg-red-500 rounded hover:bg-red-600 transition">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
