import React from "react";
import Navbar from "./landing/Navbar";
import Footer from "./landing/Footer";

const Legal = () => {
  return (
    <div>
        <Navbar/>
        <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">Términos y Políticas de Privacidad</h1>

      {/* Sección: Términos de Servicio */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Términos de Servicio</h2>
        <p className="mb-4">
          Bienvenido a Vitality. Al acceder o utilizar nuestra plataforma, aceptas cumplir con estos términos. Nos reservamos el derecho de modificar estos términos en cualquier momento. Es tu responsabilidad revisarlos periódicamente.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>No utilizarás la app para fines ilegales o no autorizados.</li>
          <li>Nos reservamos el derecho de suspender cuentas por uso indebido.</li>
          <li>No garantizamos resultados específicos, cada usuario es responsable de su progreso.</li>
          <li>Vitality puede incluir recomendaciones de ejercicio o dieta, pero no reemplaza el consejo médico profesional.</li>
        </ul>
      </section>

      {/* Sección: Política de Privacidad */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Política de Privacidad</h2>
        <p className="mb-4">
          Valoramos tu privacidad. Esta política explica cómo recolectamos, usamos y protegemos tu información.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Recolectamos datos como nombre, correo y progreso físico para mejorar tu experiencia.</li>
          <li>No compartimos tu información personal con terceros sin tu consentimiento.</li>
          <li>Utilizamos cookies para mejorar la navegación y personalizar contenidos.</li>
          <li>Puedes solicitar eliminar tus datos en cualquier momento escribiéndonos a <strong>privacidad@vitality.app</strong>.</li>
        </ul>
      </section>

      {/* Sección: Consentimiento */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Consentimiento</h2>
        <p>
          Al usar Vitality, consientes el uso de tu información de acuerdo con estos términos y políticas. Si no estás de acuerdo, por favor no utilices nuestra aplicación.
        </p>
      </section>

      {/* Última sección */}
      <section className="text-sm text-gray-500 text-center mt-12">
        Última actualización: 30 de mayo de 2025
      </section>
    </div>
    <Footer/>
    </div>
    
  );
};

export default Legal;
