import React from 'react';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactoPage = () => {
  return (
    <div>
      <Navbar/>
       <div className="min-h-screen bg-white pt-24 px-6 md:px-20 pb-16">
      {/* Banner */}
      <div className="bg-red-500 text-white text-center rounded-xl py-10 mb-14">
        <h2 className="text-xl uppercase tracking-wide mb-2">Escríbenos</h2>
        <h1 className="text-4xl font-bold">Ponte en contacto</h1>
      </div>

      {/* Formulario e imagen */}
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        {/* Formulario */}
        <form className="space-y-5">
          <h2 className="text-2xl font-bold">¡Hablemos!</h2>
          <p className="text-gray-600">
            Puedes contactarnos usando el formulario o la información de contacto.
          </p>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Apellido"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Mensaje"
            rows={5}
            className="w-full px-4 py-2 border rounded"
          ></textarea>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm text-gray-600">
                Acepto recibir otras comunicaciones.
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm text-gray-600">
                Doy mi consentimiento para el uso de mis datos.
              </span>
            </label>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded">
            Enviar mensaje
          </button>
        </form>

        {/* Imagen + contacto */}
        <div>
          <img
            src="https://images.pexels.com/photos/5745183/pexels-photo-5745183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Contacto"
            className="rounded-xl mb-8 w-full object-cover h-72"
          />

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Correo</p>
                <p>info@vitalityapp.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Teléfono</p>
                <p>+506 8888-8888</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Ubicación</p>
                <p>San Ramón, Alajuela, Costa Rica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default ContactoPage;
