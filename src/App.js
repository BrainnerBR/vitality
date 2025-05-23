import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/Register";
import Register from "./pages/auth/Login";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
