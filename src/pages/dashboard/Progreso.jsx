import React from 'react';
import Frase from '../../components/Frase';
import CaloriasQuemadasChart from './ejercicios/CaloriasQuemadasChart';

const Progreso = ({ userId, peso_kg, usuario }) => {
  console.log("userId recibido en Progreso:", userId);

  return (
    <div>
      <Frase />
    <CaloriasQuemadasChart peso_kg={80} />
    </div>
  );
};

export default Progreso;
