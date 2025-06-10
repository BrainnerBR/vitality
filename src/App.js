import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import 'primereact/resources/themes/lara-light-blue/theme.css';  // o el tema que uses
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

import LandingPage from "./pages/landing/LandingPage";
import Register from "./pages/auth/Register";
import PerfilPaso2 from "./pages/auth/PerfilPaso2"
import Login from "./pages/auth/Login";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

import Progreso from "./pages/dashboard/Progreso";
import Ejercicios from "./pages/dashboard/ejercicios/Ejercicios";
import Dieta from "./pages/dashboard/Dieta";
import Timer from "./pages/dashboard/Timer";
import Configuracion from "./pages/dashboard/Configuracion";
import DashboardLayout from "./layouts/DashboardLayout";
import Servicios from "./pages/servicios/Servicios";
import TestimoniosPage from './pages/testimonios/TestimoniosPage'
import PlanesPage from "./pages/planes/PlanesPage";
import ContactoPage from "./pages/contacto/ContactoPage";
import Legal from "./pages/Legal";
import PerfilPaso3 from "./pages/auth/PerfilPaso3";

function App() {
  return (
    <PrimeReactProvider>
      <div>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/perfil" element={<PerfilPaso2/>}/>
          <Route path="/register/objetivos" element={<PerfilPaso3/>}/>


          <Route path="/servicios" element={<Servicios/>}/>
          <Route path="/testimonios" element={<TestimoniosPage/>}/>
          <Route path="/planes" element={<PlanesPage/>}/>
          <Route path="/contacto" element={<ContactoPage/>}/>
          <Route path="/legal" element={<Legal/>}/>

          {/* Rutas protegidas con layout compartido */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/progreso" element={<Progreso />} />
            <Route path="/ejercicios" element={<Ejercicios />} />
            <Route path="/dieta" element={<Dieta />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
    </PrimeReactProvider>
    
  );
}

export default App;
