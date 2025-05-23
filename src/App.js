import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import LandingPage from "./pages/landing/LandingPage";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>

          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
