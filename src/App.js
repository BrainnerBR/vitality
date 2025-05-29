import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import 'primereact/resources/themes/lara-light-blue/theme.css';  // o el tema que uses
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

import LandingPage from "./pages/landing/LandingPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

import Home from "./pages/Home"
import Dashboard from "./pages/dashboard/Dashboard";
import Progreso from "./pages/dashboard/Progreso";
import Ejercicios from "./pages/dashboard/Ejercicios";
import Dieta from "./pages/dashboard/Dieta";
import Timer from "./pages/dashboard/Timer";
import Motivacion from "./pages/dashboard/Motivacion";
import Configuracion from "./pages/dashboard/Configuracion";
import DashboardLayout from "./layouts/DashboardLayout";

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

          {/* Rutas protegidas con layout compartido */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/progreso" element={<Progreso />} />
            <Route path="/ejercicios" element={<Ejercicios />} />
            <Route path="/dieta" element={<Dieta />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/motivacion" element={<Motivacion />} />
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
