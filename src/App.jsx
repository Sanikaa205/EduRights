import Module4Start from "./pages/module4/Module4Start";
import Module5Start from "./pages/module5/Module5Start";
import Module5Quiz from "./pages/module5/Module5Quiz";
import Module5Explanation from "./pages/module5/Module5Explanation";
import Module6Start from "./pages/module6/Module6Start";
import Module6Quiz from "./pages/module6/Module6Quiz";
import Module6Explanation from "./pages/module6/Module6Explanation";
import Module4Explanation from "./pages/module4/Module4Explanation";
import Module4Quiz from "./pages/module4/Module4Quiz";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrokenStory from "./pages/EducationalGames/BrokenStory/BrokenStory";
import BrokenStoryLevels from "./pages/EducationalGames/BrokenStory/BrokenStoryLevels";

// For now, use the same BrokenStory component for all levels (can be split later)
import MatchTheRight from "./pages/EducationalGames/MatchTheRight/MatchTheRight";
import MatchTheRightLevels from "./pages/EducationalGames/MatchTheRight/MatchTheRightLevels";

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
import LevelTwoSchoolRights from "./pages/EducationalGames/LegalHeroJourney/LevelTwoSchoolRights";
import LevelThreeOnlineSafety from "./pages/EducationalGames/LegalHeroJourney/LevelThreeOnlineSafety";
import LevelFourWorkplace from "./pages/EducationalGames/LegalHeroJourney/LevelFourWorkplace";
import BuildYourSchool from "./pages/EducationalGames/BuildYourSchool/BuildYourSchool";

import Module1Start from "./pages/module1/Module1Start";
import Module1Story from "./pages/module1/Module1Story";
import Module1Explanation from "./pages/module1/Module1Explanation";
import Module1Quiz from "./pages/module1/Module1Quiz";

import Module2Start from "./pages/module2/Module2Start";
import Module2Explanation from "./pages/module2/Module2Explanation";
import Module2Quiz from "./pages/module2/Module2Quiz";
import ComicStory from "@/pages/ComicStory";



import Module3Start from "./pages/module3/Module3Start";
import Module3Explanation from "./pages/module3/Module3Explanation";
import Module3Quiz from "./pages/module3/Module3Quiz";

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

            <Route path="/games/build-your-school" element={<BuildYourSchool />} />
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

            <Route path="/module-3" element={<Module3Start />} />
            <Route path="/module-3/explanation" element={<Module3Explanation />} />
            <Route path="/module-3/quiz" element={<Module3Quiz />} />
            <Route path="/module-4" element={<Module4Start />} />
            <Route path="/module-4/explanation" element={<Module4Explanation />} />
            <Route path="/module-4/quiz" element={<Module4Quiz />} />
            <Route path="/module-5" element={<Module5Start />} />
            <Route path="/module-5/explanation" element={<Module5Explanation />} />
            <Route path="/module-5/quiz" element={<Module5Quiz />} />
            <Route path="/module-6" element={<Module6Start />} />
            <Route path="/module-6/explanation" element={<Module6Explanation />} />
            <Route path="/module-6/quiz" element={<Module6Quiz />} />
            <Route path="/games/broken-story" element={<BrokenStoryLevels />} />
            <Route path="/games/broken-story/levels" element={<BrokenStoryLevels />} />
            <Route path="/games/broken-story/level:levelId" element={<BrokenStory />} />
            <Route path="/games/broken-story/level1" element={<BrokenStory />} />
            <Route path="/games/broken-story/level2" element={<BrokenStory />} />
            <Route path="/games/broken-story/level3" element={<BrokenStory />} />
            <Route path="/games/broken-story/level4" element={<BrokenStory />} />
            <Route path="/games/broken-story/level5" element={<BrokenStory />} />
            <Route path="/games/broken-story/level6" element={<BrokenStory />} />
            <Route path="/games/broken-story/level7" element={<BrokenStory />} />
            <Route path="/games/broken-story/level8" element={<BrokenStory />} />
            <Route path="/games/broken-story/level9" element={<BrokenStory />} />
            <Route path="/games/broken-story/level10" element={<BrokenStory />} />


            <Route path="/comic/:id" element={<ComicStory />} />

            <Route path="/games/legal-hero-journey/level-2" element={<LevelTwoSchoolRights />} />
            <Route path="/games/legal-hero-journey/level-3" element={<LevelThreeOnlineSafety />} />
            <Route path="/games/legal-hero-journey/level-4" element={<LevelFourWorkplace />} />
            <Route path="/games/match-the-right" element={<MatchTheRightLevels />} />
            <Route path="/games/match-the-right/level/:levelId" element={<MatchTheRight />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}