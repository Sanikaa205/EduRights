import { useEffect, useState } from "react";
import { levels as initialLevels } from "./levelsData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import LevelCard from "./LevelCard";
import Mascot from "@/assets/mascot.png";

export default function BrokenStoryLevels() {
  const maxLevel = initialLevels.length;
  const LEVELS_KEY = "brokenStoryUnlockedLevels";
  const COMPLETION_KEY = "brokenStoryCompletedLevels";

  // Read progress
  const savedLevel = Number(localStorage.getItem("brokenStoryLevel")) || 1;
  const [completedLevels, setCompletedLevels] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(COMPLETION_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [showCongrats, setShowCongrats] = useState(false);

  // Always derive levels from savedLevel
  const levels = initialLevels.map((level) => ({
    ...level,
    unlocked: level.id <= savedLevel,
    completed: completedLevels.includes(level.id),
  }));

  // Show completion screen when all levels are done
  useEffect(() => {
    if (savedLevel > maxLevel) {
      setShowCongrats(true);
    }
  }, [savedLevel, maxLevel]);

  // Redirect after completion
  useEffect(() => {
    if (showCongrats) {
      const timer = setTimeout(() => {
        localStorage.setItem("brokenStoryLevel", "1");
        setShowCongrats(false);
        window.location.href = "/games";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showCongrats]);

  if (showCongrats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <div className="text-7xl mb-4">🎉</div>
          <h1 className="text-5xl font-black mb-4">All Levels Completed!</h1>
          <p className="text-2xl">You're an EduRights Champion!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <img src={Mascot} alt="Mascot" className="w-20 h-20" />
            <div>
              <h1 className="text-4xl font-black text-slate-800">
                Broken Story Levels
              </h1>
              <p className="text-slate-600 mt-1">
                Fix the broken scenes and protect children's rights!
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-black text-blue-600">
                {completedLevels.length}/{maxLevel}
              </p>
              <p className="text-sm text-slate-600">Levels Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-green-600">{savedLevel}</p>
              <p className="text-sm text-slate-600">Current Progress</p>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {levels.map((level, idx) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <LevelCard
                level={level}
                isUnlocked={level.unlocked}
                isCompleted={level.completed}
              />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
