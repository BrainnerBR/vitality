import React from 'react';
import Navbar from '../landing/Navbar';
import { Card } from 'primereact/card';
import Footer from '../landing/Footer';

const TestimoniosPage = () => {
    const testimonios = [
    {
      nombre: 'Laura Méndez',
      mensaje:
        'Gracias a Vitality he logrado mantener una rutina constante de ejercicio. Los retos semanales realmente me motivan a no rendirme.',
      imagen: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      nombre: 'Carlos Ramírez',
      mensaje:
        'Los planes nutricionales me han ayudado a bajar de peso sin pasar hambre. Todo está bien explicado y es fácil de seguir.',
      imagen: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      nombre: 'Mariana Solano',
      mensaje:
        'Me encanta la motivación diaria. Cada día me levanto con una frase que me impulsa a seguir mejorando.',
      imagen: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      nombre: 'Laura Méndez',
      mensaje:
        'Gracias a Vitality he logrado mantener una rutina constante de ejercicio. Los retos semanales realmente me motivan a no rendirme.',
      imagen: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      nombre: 'Carlos Ramírez',
      mensaje:
        'Los planes nutricionales me han ayudado a bajar de peso sin pasar hambre. Todo está bien explicado y es fácil de seguir.',
      imagen: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      nombre: 'Mariana Solano',
      mensaje:
        'Me encanta la motivación diaria. Cada día me levanto con una frase que me impulsa a seguir mejorando.',
      imagen: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  return (
    <div>
      <Navbar/>
      <div className="pt-24 px-6 md:px-16 pb-16 bg-white min-h-screen">
      <section className="flex flex-col lg:flex-row items-center gap-10 mb-20">
        <img
          src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1000&q=80"
          alt="Servicio destacado"
          className="w-full lg:w-1/2 rounded-xl shadow-lg"
        />
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-red-500 mb-4">Resultados que Transforman</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nuestros usuarios están viendo cambios reales en su salud, motivación y rendimiento físico. A través de nuestros planes personalizados, miles de personas han transformado su estilo de vida. ¡Tú puedes ser el próximo!
          </p>
        </div>
      </section>

      <h3 className="text-3xl font-bold text-center text-red-500 mb-10">Lo que dicen nuestros usuarios</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonios.map((t, i) => (
          <Card
            key={i}
            className="text-center p-6 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition"
          >
            <img
              src={t.imagen}
              alt={t.nombre}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic mb-4">"{t.mensaje}"</p>
            <h4 className="font-semibold text-red-500">{t.nombre}</h4>
          </Card>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default TestimoniosPage;
