import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Ejercicios = () => {
  // ✅ Define el header antes de usarlo


  // ✅ Define el footer antes de usarlo


  // ✅ Usa las variables `header` y `footer` dentro del return
  return (
    <div className="flex justify-content-center p-4">
      <Card
        title="Advanced Card"
        subTitle="Card subtitle"
        className="md:w-25rem"
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
          numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </p>
      </Card>
    </div>
  );
};

export default Ejercicios;
