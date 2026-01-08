import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrokenStory from "./pages/EducationalGames/BrokenStory/BrokenStory";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import Resources from "./pages/Resources";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

import EducationalGames from "./pages/EducationalGames/EducationalGames";
import LegalHeroJourney from "@/pages/EducationalGames/LegalHeroJourney/LegalHeroJourney";
import LevelOneHomeRights from "@/pages/EducationalGames/LegalHeroJourney/LevelOneHomeRights";
import BuildYourSchool from "./pages/EducationalGames/BuildYourSchool/BuildYourSchool";

import Module1Start from "./pages/module1/Module1Start";
import Module1Story from "./pages/module1/Module1Story";
import Module1Explanation from "./pages/module1/Module1Explanation";
import Module1Quiz from "./pages/module1/Module1Quiz";
import Module2Start from "./pages/module2/Module2Start";
import Module2Explanation from "./pages/module2/Module2Explanation";
import Module2Quiz from "./pages/module2/Module2Quiz";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/games" element={<EducationalGames />} />
            <Route path="/games/legal-hero-journey" element={<LegalHeroJourney />} />
            <Route path="/games/legal-hero-journey/level-1" element={<LevelOneHomeRights />} />  
              
            <Route
              path="/games/build-your-school"
              element={<BuildYourSchool />}
            />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/module-1" element={<Module1Start />} />
            <Route path="/module-1/story" element={<Module1Story />} />
            <Route path="/module-1/explanation" element={<Module1Explanation />} />
            <Route path="/module-1/quiz" element={<Module1Quiz />} />
            <Route path="/module-2" element={<Module2Start />} />
            <Route path="/module-2/explanation" element={<Module2Explanation />} />
            <Route path="/module-2/quiz" element={<Module2Quiz />} />
             <Route path="/games/broken-story" element={<BrokenStory />}/>


          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}