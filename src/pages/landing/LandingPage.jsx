import Navbar from './Navbar';
import HeroImg from '../../assets/landing.jpg';
import InfoSection from './InfoSection';
import Services from './Services';
import AnimateWord from '../../animate/AnimateWord';
import ScrollReveal from '../../animate/ScrollReveal';
import Planes from './Planes';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full">
        <Navbar />
      <section className="relative flex items-center justify-center w-full h-screen px-6">
        
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroImg})`,
          }}
        >
          {/* Capa oscura */}
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        </div>


        {/* Contenido principal */}
        <div className="relative z-10 text-white flex w-full max-w-7xl px-4 md:px-8 lg:px-12 gap-12">
          
          {/* Columna izquierda: título y CTA */}
          <div className="w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-left">
              Vitality
            </h1>
              <AnimateWord/>
            <button className="mt-2 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition text-lg">
              Empieza Hoy
            </button>
          </div>

          <div className="w-1/2 flex items-center pl-32">
          <ScrollReveal>            
            <p className="text-3xl font-medium leading-relaxed text-left">
              Transforma tu rutina en progreso. <span className="text-red-600">Vitality</span> te guía con hábitos, estadísticas y motivación diaria para alcanzar la mejor versión de vos.
            </p>
          </ScrollReveal>
          </div>
          
        </div>
      </section>

      {/* Secciones siguientes */}
      <Services />
      <InfoSection />
      <Planes/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
