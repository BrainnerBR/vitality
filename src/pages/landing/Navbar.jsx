import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <nav className="bg-white shadow-lg z-50 fixed w-full">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold text-red-500">
          <Link to="/">Vitality</Link>
        </div>

        {/* Navegación central */}
        <div className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
          <Link
            to="/"
            className={`hover:text-red-500 transition ${
              isActive("/") ? "text-red-500 font-semibold underline" : ""
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/servicios"
            className={`hover:text-red-500 transition ${
              isActive("/servicios") ? "text-red-500 font-semibold underline" : ""
            }`}
          >
            Servicios
          </Link>
          <Link
            to="/testimonios"
            className={`hover:text-red-500 transition ${
              isActive("/testimonios") ? "text-red-500 font-semibold underline" : ""
            }`}
          >
            Testimonios
          </Link>
          <Link
            to="/planes"
            className={`hover:text-red-500 transition ${
              isActive("/planes") ? "text-red-500 font-semibold underline" : ""
            }`}
          >
            Planes
          </Link>
          <Link
            to="/contacto"
            className={`hover:text-red-500 transition ${
              isActive("/contacto") ? "text-red-500 font-semibold underline" : ""
            }`}
          >
            Contacto
          </Link>
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition">
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/register">
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
