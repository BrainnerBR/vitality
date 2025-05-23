import React from 'react';
import { FaAppleAlt, FaDumbbell, FaRunning } from 'react-icons/fa';
import ScrollReveal from '../../animate/ScrollReveal';

const Services = () => {
return (
    <div className="w-full max-w-7xl mx-auto py-20 px-6">
      <ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Servicio 1 */}
        <div className="flex flex-col items-center">
          <FaRunning className="text-red-500 text-6xl mb-4" />
          <h3 className="text-2xl font-semibold mb-2 opacity-0 animate-fade-in-up delay-[300ms]">Bajar de peso</h3>
          <p className="text-gray-600">
            Planes efectivos para quemar grasa, mejorar tu condición física y alcanzar tu peso ideal de manera saludable.
          </p>
        </div>

        {/* Servicio 2 */}
        <div className="flex flex-col items-center">
          <FaAppleAlt className="text-red-500 text-6xl mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Dietas personalizadas</h3>
          <p className="text-gray-600">
            Recibe recomendaciones y menús adaptados a tus objetivos, gustos y estilo de vida para una alimentación balanceada.
          </p>
        </div>

        {/* Servicio 3 */}
        <div className="flex flex-col items-center">
          <FaDumbbell className="text-red-500 text-6xl mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Gana masa muscular</h3>
          <p className="text-gray-600">
            Programas de entrenamiento y nutrición para aumentar fuerza, volumen muscular y mejorar tu rendimiento físico.
          </p>
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
}

export default Services;
