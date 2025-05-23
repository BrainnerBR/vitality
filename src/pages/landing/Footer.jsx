import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Acerca de */}
        <div>
          <h4 className="font-bold mb-4">Sobre Vitality</h4>
          <p className="text-sm">
            Vitality es tu guía diaria para desarrollar hábitos positivos, encontrar motivación constante y alcanzar tus metas personales.
          </p>
        </div>

        {/* Recursos */}
<div>
  <h4 className="font-bold mb-4 border-b border-gray-600 pb-1">Recursos</h4>
  <ul className="text-sm space-y-2">
    <li className="hover:text-red-500 cursor-pointer w-fit">Guías Diarias</li>
    <li className="hover:text-red-500 cursor-pointer w-fit">Rutinas de Hábitos</li>
    <li className="hover:text-red-500 cursor-pointer w-fit">Motivaciones</li>
    <li className="hover:text-red-500 cursor-pointer w-fit">Retos Semanales</li>
    <li className="hover:text-red-500 cursor-pointer w-fit">Estadísticas</li>
  </ul>
</div>


        {/* Enlaces útiles */}
        <div>
          <h4 className="font-bold mb-4 border-b border-gray-600 pb-1">Enlaces</h4>
          <ul className="text-sm space-y-2">
            <li className="hover:text-red-500 cursor-pointer w-fit">Nosotros</li>
            <li className="hover:text-red-500 cursor-pointer w-fit">Contáctanos</li>
            <li className="hover:text-red-500 cursor-pointer w-fit">Preguntas Frecuentes</li>
            <li className="hover:text-red-500 cursor-pointer w-fit">Blog de Vitality</li>
            <li className="hover:text-red-500 cursor-pointer w-fit">Términos y Privacidad</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-4">Motivación Diaria</h4>
          <p className="text-sm mb-4">
            Suscríbete y recibe una dosis de inspiración directamente en tu correo cada mañana.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-3 py-2 rounded-l-md text-black"
            />
            <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-r-md">
              Suscribirme
            </button>
          </form>
        </div>
      </div>

      {/* Footer base */}
      <div className="border-t border-gray-700 mt-12 pt-6 px-4 text-md flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>© 2025 Vitality. Todos los derechos reservados.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
