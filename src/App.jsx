

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Modules from "@/pages/Modules";
import EducationalGames from "@/pages/EducationalGames/EducationalGames";
import BuildYourSchool from "./pages/EducationalGames/BuildYourSchool/BuildYourSchool";
  
import Feedback from "@/pages/Feedback";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/games" element={<EducationalGames />} />
        <Route path="/games/build-your-school"element={<BuildYourSchool />}/>
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
