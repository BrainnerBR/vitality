import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

const RutinaCard = () => {
    const [fecha, setFecha] = useState('');

useEffect(() => {
  const hoy = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  setFecha(hoy.toLocaleDateString('es-ES', opciones));
}, []);




return (
    <div className="w-full h-full max-w-md bg-white shadow-xl rounded-2xl p-6 m-4 text-left">
      <h2 className="text-2xl font-bold text-red-600 mb-1">Rutina de hoy</h2>
      <p className="text-gray-500 text-sm mb-4">{fecha}</p>

    </div>
  );
}

export default RutinaCard;
