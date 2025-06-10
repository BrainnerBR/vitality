import toast from 'react-hot-toast';
import frases from '../frases.json'
import { useEffect, useState } from 'react';

const Frase = () => {
    const [fecha, setFecha] = useState('');
    const [fraseDelDia, setFraseDelDia] = useState('');

useEffect(() => {
  const hoy = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  setFecha(hoy.toLocaleDateString('es-ES', opciones));

    const dateKey = hoy.toISOString().slice(0, 10);
    const hash = Array.from(dateKey).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % frases.length;

    setFraseDelDia(frases[index]);
}, []);




return (
    <div className="w-full h-full max-w-md bg-white shadow-xl rounded-2xl p-6 m-4 text-left">
      <h2 className="text-2xl font-bold text-red-600 mb-1"></h2>
      <p className="text-gray-500 text-sm mb-4">{fecha}</p>
      <p className='text-lg text-gray-700 italic'>{fraseDelDia}</p>

    </div>
  );
}

export default Frase;
