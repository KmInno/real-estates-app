import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Properties } from "./pages/Properties";
import { PropertyDetails } from "./pages/PropertyDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<AboutUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </div>
  );
}