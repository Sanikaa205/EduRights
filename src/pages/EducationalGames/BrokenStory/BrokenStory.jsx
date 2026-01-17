import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

// ✅ SINGLE SOURCE OF DATA
import { sceneData } from "./SceneData";
import { levels } from "./levelsData";

// shuffle helper
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BrokenStory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Level logic
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const LEVELS_KEY = "brokenStoryUnlockedLevels";
  const COMPLETION_KEY = "brokenStoryCompletedLevels";
  const location = useLocation();
  // Extract level from path, default to 1
  const match = location.pathname.match(/level(\d+)/);
  const levelId = match ? parseInt(match[1], 10) : 1;
  
  // Get scenes for this level
  const levelData = levels.find((l) => l.id === levelId);
  const levelScenes = levelData
    ? sceneData.filter((scene) => levelData.sceneIds.includes(scene.id))
    : [];

  const [totalScore, setTotalScore] = useState(0);
  const [fixedItems, setFixedItems] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rejectedItemId, setRejectedItemId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [sceneActionCount, setSceneActionCount] = useState(0);
  const [shuffledItems, setShuffledItems] = useState([]);

  const celebrationRef = useRef(false);

  const currentScene = levelScenes[currentSceneIndex];

  // ✅ COUNTS BASED ON correctZone
  const correctItemCount = currentScene.items.filter(
    (i) => i.correctZone
  ).length;

  const placedCorrectCount = Object.keys(fixedItems).length;

  const isLevelComplete =
    correctItemCount > 0 && placedCorrectCount === correctItemCount;

  // reset on scene change
  useEffect(() => {
    setFixedItems({});
    setSelectedItemId(null);
    setRejectedItemId(null);
    setShowCelebration(false);
    setShowCompletionModal(false);
    setSceneActionCount(0);
    setShuffledItems(shuffleArray(currentScene.items));
    celebrationRef.current = false;
  }, [currentSceneIndex, currentScene.items]);

  // Unlock next level when all scenes are complete
  useEffect(() => {
    if (showCompletionModal && currentSceneIndex === levelScenes.length - 1) {
      // All scenes complete for this level
      let unlocked = [1];
      let completed = [];
      try {
        unlocked = JSON.parse(localStorage.getItem(LEVELS_KEY)) || [1];
        completed = JSON.parse(localStorage.getItem(COMPLETION_KEY)) || [];
      } catch {}
      
      // Mark this level as completed
      if (!completed.includes(levelId)) {
        completed.push(levelId);
        localStorage.setItem(COMPLETION_KEY, JSON.stringify(completed));
      }
      
      const nextLevel = levelId + 1;
      if (!unlocked.includes(nextLevel) && nextLevel <= levels.length) {
        unlocked.push(nextLevel);
        localStorage.setItem(LEVELS_KEY, JSON.stringify(unlocked));
      }
      // Save next level progress
      localStorage.setItem("brokenStoryLevel", Math.max(levelId + 1, nextLevel).toString());
    }
  }, [showCompletionModal, currentSceneIndex, levelId, levelScenes.length]);

  // celebration + modal
  useEffect(() => {
    if (sceneActionCount === 0) return;

    if (isLevelComplete && !celebrationRef.current) {
      celebrationRef.current = true;
      setShowCelebration(true);

      try {
        const audio = new Audio(
          "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"
        );
        audio.volume = 0.35;
        audio.play().catch(() => {});
      } catch {}

      setTimeout(() => setShowCelebration(false), 2000);
      setTimeout(() => setShowCompletionModal(true), 2500);
    }
  }, [sceneActionCount, isLevelComplete]);

  // zone click
  const handleZoneClick = (zoneId) => {
    if (!selectedItemId) return;

    const item = currentScene.items.find((i) => i.id === selectedItemId);

    if (!item || !item.correctZone || fixedItems[item.id]) {
      setRejectedItemId(selectedItemId);
      setTimeout(() => setRejectedItemId(null), 400);
      toast({
        title: "Not quite!",
        description: "This item belongs somewhere else.",
      });
      setSelectedItemId(null);
      return;
    }

    if (zoneId === item.correctZone) {
      setFixedItems((p) => ({ ...p, [item.id]: true }));
      setSceneActionCount((c) => c + 1);

      const placed = Object.keys(fixedItems).length;
      const points = placed === correctItemCount - 1 ? 4 : 3;
      setTotalScore((s) => s + points);

      toast({
        title: "✓ Correct!",
        description: `${item.text} placed correctly. +${points} points`,
      });
    } else {
      setRejectedItemId(selectedItemId);
      setTimeout(() => setRejectedItemId(null), 400);
      toast({
        title: "Not quite!",
        description: "This item belongs somewhere else.",
      });
    }

    setSelectedItemId(null);
  };

  const handleNextScene = () => {
    setShowCompletionModal(false);
    setShowCelebration(false);

    if (currentSceneIndex < levelScenes.length - 1) {
      setCurrentSceneIndex((i) => i + 1);
    } else {
      // Finished all scenes in this level, go to level selection page
      navigate("/games/broken-story/levels");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{currentScene?.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Scene {currentSceneIndex + 1} of {levelScenes.length}
              </p>
              <h1 className="text-3xl font-black text-slate-800">
                {currentScene?.title}
              </h1>
            </div>
          </div>
          <p className="text-slate-600 mt-2">{currentScene?.hint}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
          {/* ✅ LEFT SIDEBAR (RESTORED) */}
          <div className="w-full lg:w-64">
            <Card className="p-6 bg-blue-50 border-2 border-blue-200 h-full">
              <p className="text-xs font-bold text-blue-800 uppercase mb-4">
                How to Play
              </p>
              <ol className="text-sm space-y-3 text-slate-700">
                <li>1. Select an item from right</li>
                <li>2. Click correct zone</li>
                <li>3. Fix the broken scene</li>
                <li>4. Complete all scenes</li>
              </ol>
            </Card>
          </div>

          {/* CENTER */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl border overflow-hidden">
            <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
              <img
                src={isLevelComplete ? currentScene?.fixedBg : currentScene?.brokenBg}
                alt="Scene background"
                className="w-full h-full object-contain rounded-xl border border-slate-300 shadow"
                style={{ background: 'transparent' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  animate={
                    isLevelComplete
                      ? { y: [0, -12, 0] }
                      : { x: [-3, 3, -3] }
                  }
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl"
                >
                  {isLevelComplete ? "😊" : "😢"}
                </motion.div>
                <p className="text-sm mt-2 font-semibold">
                  {placedCorrectCount}/{correctItemCount} Complete
                </p>
              </div>

              {showCelebration && (
                <div className="absolute top-16 inset-x-0 text-center text-6xl">
                  🎉
                </div>
              )}
            </div>

            {/* ZONES */}
            <div className="p-6 flex gap-4 justify-center flex-wrap">
              {currentScene?.zones.map((zone) => {
                const isFixed = currentScene?.items.some(
                  (i) => i.correctZone === zone.id && fixedItems[i.id]
                );
                return (
                  <DropZone
                    key={zone.id}
                    label={zone.label}
                    isFixed={isFixed}
                    onClick={() => handleZoneClick(zone.id)}
                    highlight={!!selectedItemId}
                  />
                );
              })}
            </div>
          </div>

          {/* RIGHT ITEMS */}
          <div className="w-full lg:w-72">
            <Card className="p-6 bg-slate-50 border-2 h-full">
              <p className="text-xs font-semibold uppercase mb-4">
                Available Items
              </p>
              <div className="flex lg:flex-col gap-4 flex-wrap">
                {shuffledItems.map(
                  (item) =>
                    !fixedItems[item.id] && (
                      <DraggableItem
                        key={item.id}
                        item={item}
                        isRejected={rejectedItemId === item.id}
                        isSelected={selectedItemId === item.id}
                        onSelect={setSelectedItemId}
                      />
                    )
                )}
              </div>
            </Card>
          </div>
        </div>

        <AnimatePresence>
          {showCompletionModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <Card className="w-96 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold mb-2">
                    Congratulations!
                  </h3>

                  <p className="text-xl font-semibold text-primary mb-4">
                    {currentSceneIndex < levelScenes.length - 1 
                      ? `Scene ${currentSceneIndex + 1} Complete! 🌟`
                      : `Level Complete! 🌟`
                    }
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    You've successfully repaired the scene and protected the <strong>{currentScene?.title}</strong>!
                  </p>

                  {/* Motivational Badge Message - Improved Alignment */}
                  <div className="flex flex-col items-center mb-6 mt-2 w-full">
                    {currentSceneIndex === levelScenes.length - 1 ? (
                      <>
                        <div className="flex justify-center w-full">
                          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 font-bold text-base px-6 py-2 rounded-full shadow border-2 border-yellow-400 whitespace-nowrap">
                            {levelData.badge && (
                              <>
                                {levelData.badge.split(" ")[0]}
                                <span className="ml-2">You earned a <span className="underline decoration-yellow-600">{levelData.badge.replace(/^[^ ]+ /, "")}</span> badge!</span>
                              </>
                            )}
                          </span>
                        </div>
                        <span className="text-xs text-yellow-700 font-semibold mt-2 text-center block">Keep going, Rights Champion!</span>
                      </>
                    ) : (
                      <div className="bg-slate-100 rounded-xl py-3 px-6 w-full">
                        <p className="text-lg font-bold text-slate-800">Score: {totalScore}</p>
                        <p className="text-xs text-slate-500 mt-1">{levelScenes.length - currentSceneIndex - 1} scenes remaining</p>
                      </div>
                    )}
                  </div>

                  {currentSceneIndex < levelScenes.length - 1 ? (
                    <button
                      onClick={handleNextScene}
                      className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                    >
                      Next Scene →
                    </button>
                  ) : (
                    <button
                      onClick={handleNextScene}
                      className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                    >
                      Next Level 🚀
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/games")}
                    className="w-full mt-3 px-8 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition"
                  >
                    🏠 Go to Games
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>


      </main>

      <Footer />
    </div>
  );
};

/* --------- COMPONENTS ---------- */

const DraggableItem = ({ item, isRejected, isSelected, onSelect }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isRejected) {
      controls.start({
        x: [0, -8, 8, -8, 8, 0],
        transition: { duration: 0.4 },
      });
    }
  }, [isRejected, controls]);

  return (
    <motion.div
      animate={controls}
      onClick={() => onSelect(item.id)}
      whileHover={{ scale: 1.05 }}
      className={`cursor-pointer p-4 rounded-xl border text-center ${
        isSelected ? "border-blue-400" : "border-slate-300"
      }`}
    >
      <div className="text-3xl">{item.text.split(" ")[0]}</div>
      <p className="text-xs font-semibold mt-2">{item.text}</p>
    </motion.div>
  );
};

const DropZone = ({ label, isFixed, onClick, highlight }) => (
  <div
    onClick={onClick}
    className={`min-w-[180px] p-6 rounded-lg border text-center cursor-pointer ${
      isFixed
        ? "bg-green-50 border-green-400"
        : highlight
        ? "bg-blue-50 border-blue-400"
        : "border-dashed"
    }`}
  >
    {isFixed && <CheckCircle2 className="mx-auto text-green-600" />}
    <p className="text-sm font-semibold mt-2">{label}</p>
  </div>
);

export default BrokenStory;
