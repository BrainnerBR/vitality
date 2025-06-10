import React from 'react';
import Footer from '../landing/Footer';
import Navbar from '../landing/Navbar';
import { FaAppleAlt, FaCalendarWeek, FaDumbbell, FaFire, FaHeartbeat, FaShareAlt } from 'react-icons/fa';
import { Card } from 'primereact/card';
import Planes from '../landing/Planes';


const Servicios = () => {
    const servicios = [
    {
      icon: <FaDumbbell className="text-4xl text-red-500" />,
      titulo: 'Planes de Entrenamiento',
      descripcion:
        'Rutinas personalizadas para cada objetivo: pérdida de peso, ganancia muscular o mantenimiento. Actualizadas semanalmente según tu progreso.',
      imagen: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      icon: <FaAppleAlt className="text-4xl text-red-500" />,
      titulo: 'Planes Nutricionales',
      descripcion:
        'Planes de alimentación balanceados y adaptados a tu tipo de cuerpo, metabolismo y metas. Con recetas fáciles y seguimiento.',
      imagen: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      titulo: 'Motivación Diaria',
      descripcion:
        'Frases, desafíos y mini-retos diarios para mantenerte motivado y constante en tu camino hacia una mejor versión de ti.',
      imagen: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31?auto=format&fit=crop&w=900&q=80',
    },
    {
      icon: <FaFire className="text-4xl text-red-500" />,
      titulo: 'Tracking de Ejercicio',
      descripcion:
        'Registra automáticamente tus entrenamientos, calorías quemadas, repeticiones y rendimiento. Compatible con múltiples dispositivos.',
      imagen: 'https://images.pexels.com/photos/4944958/pexels-photo-4944958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      icon: <FaShareAlt className="text-4xl text-red-500" />,
      titulo: 'Comparte tus Resultados',
      descripcion:
        'Comparte tu progreso con otros usuarios. Inspira y recibe apoyo de la comunidad Vitality. Funciones sociales y ranking semanal.',
      imagen: 'https://images.unsplash.com/photo-1625027589035-0844e7f91b1b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      icon: <FaCalendarWeek className="text-4xl text-red-500" />,
      titulo: 'Retos Semanales y Rachas',
      descripcion:
        'Supera desafíos semanales personalizados y mantén tu racha activa. Gana insignias, desbloquea logros y mantén la constancia con seguimiento automático.',
      imagen: 'https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <div>
        <Navbar/>
            <div className="pt-24 px-6 md:px-16 pb-16 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">Nuestros Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {servicios.map((servicio, index) => (
          <Card
            key={index}
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition"
            title={<div className="flex items-center gap-3">{servicio.icon}<span>{servicio.titulo}</span></div>}
          >
            <img
              src={servicio.imagen}
              alt={servicio.titulo}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 text-base leading-relaxed">{servicio.descripcion}</p>
          </Card>
        ))}
      </div>
    </div>
      <Planes/>
      <Footer/>
    </div>
  );
}

export default Servicios;
