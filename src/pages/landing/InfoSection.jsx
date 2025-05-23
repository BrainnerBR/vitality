import React from 'react';
import ScrollReveal from '../../assets/animate/ScrollReveal';

const InfoSection = () => {
  return (
    <div>
      {/* Sección normal: imagen izquierda, texto derecha */}
      <ScrollReveal>
      <div className="flex items-center justify-center w-full max-w-7xl mx-auto py-28 px-5">
        <div className="w-1/2 flex justify-center">
          <img
            src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-xl h-auto"
            alt="Healthy"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start pl-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Transforma tu rutina en progreso
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Vitality te guía con hábitos, estadísticas y motivación diaria para alcanzar la mejor versión de vos.
          </p>
        </div>
      </div>
      </ScrollReveal>

      <ScrollReveal>
      {/* Sección invertida: texto izquierda, imagen derecha */}
      <div className="flex items-center justify-center w-full max-w-7xl mx-auto py-28 px-6">
        <div className="w-1/2 flex flex-col justify-center items-start pr-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Logra constancia y resultados reales
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Controla tu progreso, mantén tus rachas y accede a consejos prácticos para un estilo de vida saludable.
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <img
            src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-xl h-auto"
            alt="Healthy"
          />
        </div>
      </div>
      </ScrollReveal>


      <ScrollReveal>
      <div className="flex items-center justify-center w-full max-w-7xl mx-auto py-28 px-6">
        <div className="w-1/2 flex justify-center">
          <img
            src="https://images.pexels.com/photos/866023/pexels-photo-866023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-xl h-auto"
            alt="Healthy"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start pl-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Comparte tu progreso, inspira a otros y mantén viva tu motivación.
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Suma rachas, sigue tu evolución y comparte tus resultados con amigos y comunidad.
          </p>
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
};

export default InfoSection;
