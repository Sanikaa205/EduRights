import { useEffect, useState } from "react";
import { levels as initialLevels } from "../../../data/levelsData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Mascot from "@/assets/mascot.png";
import { Lock } from "lucide-react";

export default function LegalHeroJourney() {
  const maxLevel = initialLevels.length;
  const COMPLETION_LEVEL = maxLevel + 1;

  // Read progress
  const savedLevel = Number(localStorage.getItem("legalHeroLevel")) || 1;

  const [showCongrats, setShowCongrats] = useState(false);

  // ✅ Always derive levels from savedLevel (NO useState here)
  const levels = initialLevels.map((level) => ({
    ...level,
   unlocked: level.id <= savedLevel,

  }));

  // 🎉 Show completion screen ONLY when finished
  useEffect(() => {
    if (savedLevel === COMPLETION_LEVEL) {
      setShowCongrats(true);
    }
  }, [savedLevel, COMPLETION_LEVEL]);

  // ⏳ Redirect + reset progress
  useEffect(() => {
    if (showCongrats) {
      const timer = setTimeout(() => {
        // 🔄 reset game progress
        localStorage.setItem("legalHeroLevel", "1");
        setShowCongrats(false);
        window.location.href = "/games";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showCongrats]);

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen py-8 px-0 bg-background">
        <h1 className="text-5xl font-extrabold mb-4 text-center text-primary drop-shadow-lg">
          🗺 Legal Hero Journey
        </h1>

        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
          Complete levels, earn badges, and unlock new rights-based adventures.
        </p>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-4">
            {levels.map((level, idx) => (
              <div key={level.id} className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold border-2 ${level.unlocked ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/40'} shadow`}>
                {level.id}
              </div>
            ))}
          </div>
        </div>

        <div className="py-12 flex flex-col items-center gap-12 w-full">
          {levels.map((level, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={level.id}
                className="relative flex flex-col items-center w-full"
                style={{ minHeight: '160px' }}
              >
                {/* Zig-zag connector */}
                {index !== 0 && (
                  <svg
                    width="80" height="80" viewBox="0 0 80 80"
                    className={`absolute z-0 left-1/2 -translate-x-1/2 -top-16`}
                    style={{ pointerEvents: 'none' }}
                  >
                    <path
                      d={isEven
                        ? 'M40,0 Q0,40 40,80' // left curve
                        : 'M40,0 Q80,40 40,80' // right curve
                      }
                      stroke="#bbb" strokeWidth="4" fill="none"
                    />
                  </svg>
                )}

                <div className={`flex w-full justify-center ${isEven ? 'pl-[28rem]' : 'pr-[28rem]'}`}>
                  <div className={`flex flex-col items-center w-[550px] rounded-3xl shadow-lg border-4 p-4 text-sm transition-all duration-300 ${level.unlocked ? 'bg-gradient-to-br from-white to-blue-50 border-primary/30 hover:shadow-xl hover:scale-[1.02]' : 'bg-gradient-to-br from-stone-100 to-stone-200 border-stone-300'}`}>
                    {/* Badge/Icon */}
                    <div className={`mb-2 text-3xl font-display font-bold drop-shadow-md ${level.unlocked ? 'text-primary' : 'text-stone-500'}`}>{level.badge}</div>
                    
                    {level.unlocked ? (
                      <>
                        {/* Mascot for unlocked */}
                        <motion.img
                          src={Mascot}
                          alt="Mascot"
                          className="w-14 h-14 mb-2 drop-shadow-lg"
                          animate={{ y: [0, -12, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        {/* Level Button */}
                        <Button
                          size="lg"
                          className="w-3/4 h-10 text-lg font-bold flex flex-col justify-center items-center shadow-lg border-2 border-primary/60 hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-blue-400 text-white rounded-xl"
                          onClick={() =>
                            (window.location.href = `/games/legal-hero-journey/level-${level.id}`)
                          }
                        >
                          🚀 Level {level.id}: {level.title}
                        </Button>
                        <p className="text-muted-foreground text-sm text-center mt-2 max-w-[400px] font-medium">
                          {level.description}
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Locked state - attractive design */}
                        <motion.div 
                          className="flex flex-col items-center justify-center py-2"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-stone-400 to-stone-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xl font-display font-bold text-stone-600 mb-1">Locked</span>
                          <p className="text-stone-500 text-xs text-center font-medium">
                            Complete previous level to unlock
                          </p>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🎉 FINAL COMPLETION MODAL */}
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 text-center text-white p-6"
          >
            <h2 className="text-5xl font-extrabold mb-4">
              🏆 Congratulations!
            </h2>
            <p className="text-xl mb-6">
              You completed the Legal Hero Journey and earned all badges!
            </p>

            <motion.img
              src={Mascot}
              alt="Mascot Celebration"
              className="w-28 h-28 animate-bounce"
            />

            <p className="mt-4 text-sm opacity-80">
              Redirecting to games...
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-20" />
      <Footer />
    </>
  );
}
