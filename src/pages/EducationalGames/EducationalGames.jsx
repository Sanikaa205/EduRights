import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { levels as brokenStoryLevels } from "./BrokenStory/levelsData";
import { levels as legalHeroLevels } from "../../data/levelsData";
import { schoolLevels } from "./BuildYourSchool/schoolElements";
import { levels as matchTheRightLevels } from "./MatchTheRight/data";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

// Custom Large Linear Progress Bar
function LargeLinearProgress({ value }) {
  return (
    <div className="relative w-full h-6 rounded-full bg-white border border-blue-100 overflow-hidden mx-auto" style={{ minWidth: "1800px", maxWidth: "100%" }}>
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
          transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-700">
        {value}%
      </div>
    </div>
  );
}

// Custom Progress for game boxes
function CustomProgress({ value }) {
  return (
    <div className="relative w-full h-3 rounded-full bg-white border border-blue-100 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
          transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

function MainProgressCard({ value }) {
  return (
    <div
      className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6 max-w-3xl mx-auto mb-10 flex flex-col gap-2"
      style={{ boxShadow: "0 2px 8px 0 #e0f2fe" }}
    >
      <div className="flex items-center gap-4 mb-2">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #7f9cf5 0%, #38bdf8 100%)",
          }}
        >
          <Trophy className="text-white w-7 h-7" />
        </div>
        <div>
          <div className="text-2xl font-extrabold text-slate-800">
            Your Progress
          </div>
          <div className="text-base text-slate-500">
            Keep up the progress — you're at {value}%.
          </div>
        </div>
      </div>
      <div className="w-full mt-2">
        <div className="relative w-full h-7 rounded-full bg-blue-50 border border-blue-100 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full shadow"
            style={{
              width: `${value}%`,
              background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
              transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
              boxShadow: "0 2px 8px 0 #bae6fd",
            }}
          />
        </div>
        <div className="text-xs text-slate-500 mt-2">Progress</div>
      </div>
    </div>
  );
}

export default function EducationalGames() {
  const navigate = useNavigate();

  // State for real-time progress updates
  const [brokenStoryProgress, setBrokenStoryProgress] = useState(0);
  const [legalHeroProgress, setLegalHeroProgress] = useState(0);
  const [buildSchoolProgress, setBuildSchoolProgress] = useState(0);
  const [matchRightProgress, setMatchRightProgress] = useState(0);

  // Function to calculate all progress from localStorage
  const calculateProgress = () => {
    // Broken Story
    const brokenStoryCompleted = JSON.parse(
      localStorage.getItem("brokenStoryCompletedLevels") || "[]"
    );
    setBrokenStoryProgress(Math.round(
      (brokenStoryCompleted.length / brokenStoryLevels.length) * 100
    ));

    // Legal Hero Journey
    const legalHeroLevel = Number(localStorage.getItem("legalHeroLevel") || 1);
    setLegalHeroProgress(Math.round(
      ((legalHeroLevel - 1) / legalHeroLevels.length) * 100
    ));

    // Build Your School (uses "buildSchoolLevel" key)
    const buildSchoolLevel = Number(
      localStorage.getItem("buildSchoolLevel") || 1
    );
    setBuildSchoolProgress(Math.round(
      ((buildSchoolLevel - 1) / schoolLevels.length) * 100
    ));

    // Match The Right
    const matchRightUnlocked = Number(localStorage.getItem("matchTheRightUnlockedLevel") || 1);
    setMatchRightProgress(Math.round(
      ((matchRightUnlocked - 1) / matchTheRightLevels.length) * 100
    ));
  };

  // Calculate on mount and listen for storage changes
  useEffect(() => {
    calculateProgress();

    // Listen for localStorage changes (from other tabs or same tab)
    const handleStorageChange = (e) => {
      if (e.key === "buildSchoolLevel" || 
          e.key === "brokenStoryCompletedLevels" || 
          e.key === "legalHeroLevel" || 
          e.key === "matchTheRightUnlockedLevel") {
        calculateProgress();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also recalculate when window gains focus (for same-tab updates)
    const handleFocus = () => calculateProgress();
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Average progress
  const allProgress = [
    brokenStoryProgress,
    legalHeroProgress,
    buildSchoolProgress,
    matchRightProgress,
  ];
  const avgProgress = Math.round(
    allProgress.reduce((a, b) => a + b, 0) / allProgress.length
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] relative overflow-hidden">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated blobs */}
        <div className="absolute -top-20 -right-16 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-16 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-yellow-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-green-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}} />
        
        {/* Floating emojis */}
        <div className="absolute top-28 left-[8%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3s'}}>🎮</div>
        <div className="absolute top-44 right-[12%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>🏆</div>
        <div className="absolute bottom-52 left-[15%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.5s', animationDelay: '1s'}}>⭐</div>
        <div className="absolute top-60 right-[6%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.8s', animationDelay: '1.5s'}}>🎯</div>
        <div className="absolute bottom-36 right-[18%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.2s', animationDelay: '2s'}}>🦸</div>
        <div className="absolute top-1/2 left-[3%] text-3xl animate-pulse opacity-30" style={{animationDuration: '2s'}}>✨</div>
        <div className="absolute top-24 left-[45%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.7s', animationDelay: '0.8s'}}>🌟</div>
        <div className="absolute bottom-20 left-[35%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.3s', animationDelay: '1.2s'}}>🎪</div>
      </div>
      
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* ===================== HERO SECTION ===================== */}
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-3">
            🎮 Learn Your Rights Through Games!
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Play fun missions, earn stars ⭐, and become a Legal Hero 🦸‍♂️
            Learning your rights has never been this exciting!
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Badge className="text-base px-4 py-2">⭐ Earn Rewards</Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              🏆 Level Up
            </Badge>
          </div>
        </section>

        {/* ===================== PROGRESS BAR ===================== */}
        <MainProgressCard value={avgProgress} />

        {/* ===================== GAMES GRID ===================== */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* -------- Build Your School -------- */}
          <Card className="bg-white border-gray-100 transition-transform hover:scale-[1.04] hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                🏫 Build Your School
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Design a beautiful school by adding classrooms, playgrounds,
                ramps, and safety features. Learn child rights by building!
              </p>

              <div className="flex items-center justify-between mb-4">
                <Badge>🎮 Builder Game</Badge>
                <Badge variant="secondary">🏆 Flagship</Badge>
              </div>

              <div className="flex flex-col items-center mb-2">
                <CustomProgress value={buildSchoolProgress} />
                <div className="text-xs text-slate-500 mb-2">
                  Progress: {buildSchoolProgress}%
                </div>
              </div>
              <Button
                className="w-full text-lg"
                onClick={() => navigate("/games/build-your-school")}
              >
                Start Building 🚀
              </Button>
            </CardContent>
          </Card>

          {/* -------- Match The Right -------- */}
          <Card className="bg-white border-gray-100 transition-transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧩 Match The Right
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4">
                Drag and match situations with the correct child rights.
                Think fast and score more!
              </p>

              <div className="flex items-center justify-between mb-4">
                <Badge>⭐ Easy</Badge>
                <Badge variant="secondary">🧠 Puzzle</Badge>
              </div>

              <div className="flex flex-col items-center mb-2">
                <CustomProgress value={matchRightProgress} />
                <div className="text-xs text-slate-500 mb-2">
                  Progress: {matchRightProgress}%
                </div>
              </div>
              <Button
                className="w-full text-lg"
                onClick={() => navigate("/games/match-the-right")}
              >
                Play Now 🎮
              </Button>
            </CardContent>
          </Card>

          {/* -------- Broken Story -------- */}
          <Card className="bg-white border-gray-100 transition-transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧩 Broken Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Fix the broken story by placing the right items in the right spots. Learn about rights as you repair each scene!
              </p>
              <div className="flex items-center justify-between mb-4">
                <Badge>⭐ Medium</Badge>
                <Badge variant="secondary">🧠 Logic Game</Badge>
              </div>
              <div className="flex flex-col items-center mb-2">
                <CustomProgress value={brokenStoryProgress} />
                <div className="text-xs text-slate-500 mb-2">
                  Progress: {brokenStoryProgress}%
                </div>
              </div>
              <Button
                className="w-full text-lg"
                onClick={() => navigate("/games/broken-story")}
              >
                Play Now 🛠️
              </Button>
            </CardContent>
          </Card>

          {/* -------- Legal Hero Journey -------- */}
          <Card className="bg-white border-gray-100 transition-transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🦸‍♀️ Legal Hero Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Complete levels, unlock badges, and become a true Legal Hero.
                Your journey starts here!
              </p>
              <div className="flex items-center justify-between mb-4">
                <Badge>⭐ Adventure</Badge>
                <Badge variant="secondary">🗺 Levels</Badge>
              </div>
              <div className="flex flex-col items-center mb-2">
                <CustomProgress value={legalHeroProgress} />
                <div className="text-xs text-slate-500 mb-2">
                  Progress: {legalHeroProgress}%
                </div>
              </div>
              <Button
                className="w-full text-lg"
                onClick={() => navigate("/games/legal-hero-journey")}
              >
                Start Journey 🗺
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* ===================== FUN FACT ===================== */}
        <section className="mt-12 max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
            <CardContent className="text-center py-6">
              <p className="text-lg font-semibold text-gray-800">💡 Did you know?</p>
              <p className="text-gray-500 mt-2">
                Every child has the right to education, safety, and to be heard.
                Learning your rights helps you protect yourself and others!
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}