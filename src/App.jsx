import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import Resources from "./pages/Resources";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

// Educational Games
import EducationalGames from "./pages/EducationalGames/EducationalGames";
import LegalHeroJourney from "@/pages/EducationalGames/LegalHeroJourney/LegalHeroJourney";
import LevelOneHomeRights from "@/pages/EducationalGames/LegalHeroJourney/LevelOneHomeRights";
import LevelTwoSchoolRights from "@/pages/EducationalGames/LegalHeroJourney/LevelTwoSchoolRights";
import LevelThreeOnlineSafety from "@/pages/EducationalGames/LegalHeroJourney/LevelThreeOnlineSafety";
import LevelFourWorkplace from "@/pages/EducationalGames/LegalHeroJourney/LevelFourWorkplace";
import BrokenStory from "./pages/EducationalGames/BrokenStory/BrokenStory";
import BuildYourSchool from "./pages/EducationalGames/BuildYourSchool/BuildYourSchool";

// Module pages
import Module1Start from "./pages/module1/Module1Start";
import Module1Story from "./pages/module1/Module1Story";
import Module1Explanation from "./pages/module1/Module1Explanation";
import Module1Quiz from "./pages/module1/Module1Quiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Educational Games */}
          <Route path="/games" element={<EducationalGames />} />
          <Route path="/games/legal-hero-journey" element={<LegalHeroJourney />} />
          <Route path="/games/legal-hero-journey/level-1" element={<LevelOneHomeRights />} />
          <Route path="/games/legal-hero-journey/level-2" element={<LevelTwoSchoolRights />} />
          <Route path="/games/legal-hero-journey/level-3" element={<LevelThreeOnlineSafety />} />
          <Route path="/games/legal-hero-journey/level-4" element={<LevelFourWorkplace />} />

          {/* Other Games */}
          <Route path="/games/broken-story" element={<BrokenStory />} />
          <Route path="/games/build-your-school" element={<BuildYourSchool />} />

          {/* Module Pages */}
          <Route path="/module-1/start" element={<Module1Start />} />
          <Route path="/module-1/story" element={<Module1Story />} />
          <Route path="/module-1/explanation" element={<Module1Explanation />} />
          <Route path="/module-1/quiz" element={<Module1Quiz />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
