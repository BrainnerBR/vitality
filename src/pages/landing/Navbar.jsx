import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg z-50 fixed w-full">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Izquierda: Logo */}
        <div className="text-3xl font-bold text-red-500">
          <Link to="/">Vitality</Link>
        </div>

        {/* Navegación central */}
        <div className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
          <a href="#inicio" className="hover:text-red-500 transition">
            Inicio
          </a>
          <a href="#servicios" className="hover:text-red-500 transition">
            Servicios
          </a>
          <a href="#testimonios" className="hover:text-red-500 transition">
            Testimonios
          </a>
          <a href="#planes" className="hover:text-red-500 transition">
            Planes
          </a>
          <a href="#contacto" className="hover:text-red-500 transition">
            Contacto
          </a>
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <Link to={"/login"}>
            <button className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition">
              Iniciar Sesión
            </button>
          </Link>
          <Link to={'/register'}>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
