import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import RutinaCard from "../components/RutinaCard";

const Home = () => {
  return (
    <div className="flex">
        <Outlet /> {/* Aquí se renderizan las subrutas */}
        <RutinaCard/>
    </div>
  );
};

export default Home;
