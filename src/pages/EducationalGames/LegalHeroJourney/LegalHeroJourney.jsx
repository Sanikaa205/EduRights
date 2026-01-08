import { useEffect, useState } from "react";
import { levels as initialLevels } from "./levelsData";
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          🗺 Legal Hero Journey
        </h1>

        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          Complete levels, earn badges, and unlock new rights-based adventures.
        </p>

        <div className="overflow-x-auto py-8">
          <div className="relative flex items-center min-w-[1200px] gap-16">
            {levels.map((level, index) => {
              const isEven = index % 2 === 0;
              const nextLevel = levels[index + 1];

              return (
                <div
                  key={level.id}
                  className="relative flex flex-col items-center"
                >
                  {/* Path */}
                  {nextLevel && (
                    <svg
                      className="absolute z-0"
                      width="120"
                      height="80"
                      viewBox="0 0 120 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        top: isEven ? "30px" : "auto",
                        bottom: isEven ? "auto" : "30px",
                        left: "100%",
                      }}
                    >
                      <path
                        d={
                          isEven
                            ? "M0,40 Q60,0 120,40"
                            : "M0,40 Q60,80 120,40"
                        }
                        stroke="#ccc"
                        strokeWidth="4"
                        fill="transparent"
                      />
                    </svg>
                  )}

                  {/* Mascot */}
                  {level.unlocked && (
                    <motion.img
                      src={Mascot}
                      alt="Mascot"
                      className="w-14 h-14 mb-2"
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}

                  {/* Level Button */}
                  <Button
                    size="lg"
                    disabled={!level.unlocked}
                    className={`w-56 h-20 text-lg flex flex-col justify-center items-center ${
                      !level.unlocked
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      (window.location.href = `/games/legal-hero-journey/level-${level.id}`)
                    }
                  >
                    {level.unlocked ? (
                      `Level ${level.id}: ${level.title}`
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </Button>

                  <p className="text-muted-foreground text-sm text-center mt-2 max-w-[150px]">
                    {level.description}
                  </p>
                </div>
              );
            })}
          </div>
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

      <Footer />
    </>
  );
}
