import React from 'react';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';

const Planes = () => {
  const plans = [
    {
      title: 'Free',
      price: '$0',
      features: [
        '1 usuario',
        'Acceso a frases motivacionales',
        'Acceso parcial a retos diarios',
        'Seguimiento básico de ejercicio',
      ],
      delay: 0.4,
    },
    {
      title: 'Standard',
      price: '$8',
      features: [
        '1 usuario',
        'Soporte básico',
        'Acceso limitado a rutinas y planes',
        'Acceso completo a motivación diaria',
        'Historial de progreso mensual',
      ],
      delay: 0,
    },
    {
      title: 'Standard Plus',
      price: '$12',
      features: [
        '3 usuarios',
        'Soporte prioritario',
        'Acceso completo a rutinas, nutrición y retos',
        'Estadísticas detalladas',
        'Sincronización con dispositivos externos',
      ],
      delay: 0.2,
    },
    {
      title: 'Premium',
      price: '$18',
      features: [
        'Usuarios ilimitados',
        'Soporte 24/7',
        'Acceso VIP + Integraciones premium',
        'Reportes y gráficas avanzadas',
        'Seguimiento nutricional profesional',
      ],
      delay: 0.4,
    },
  ];

  return (
    <div>
      <Navbar/>
      <div className="pt-24 px-6 md:px-16 pb-16 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">Planes Vitality</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition bg-white"
          >
            <h2 className="text-2xl font-semibold text-red-500 mb-2 text-center">{plan.title}</h2>
            <p className="text-center text-3xl font-bold text-gray-800 mb-6">{plan.price} / mes</p>
            <ul className="text-gray-700 space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a
                href="/register"
                className="inline-block px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
              >
                Elegir Plan
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full bg-red-500 py-10 rounded-xl text-center">
        <h2 className="text-white text-2xl md:text-3xl font-semibold">¡Regístrate Gratis y Transforma tu Vida con Vitality!</h2>
        <a
          href="/register"
          className="mt-4 inline-block px-8 py-3 bg-white text-red-500 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Regístrate Gratis
        </a>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Planes;
