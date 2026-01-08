import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

// Import images - Broken and Fixed versions
// Scene 2: Right to Safety
import safetyBrokenBg from "@/assets/protection_broken.jpeg";
import safetyFixedBg from "@/assets/protection_fixed.jpeg";
// Scene 3: Right to Equality
import equalityBrokenBg from "@/assets/equality_broken.jpeg";
import equalityFixedBg from "@/assets/euality_fixed.jpeg";
// Scene 4: Right to Play
import playBrokenBg from "@/assets/righttoplay_broken.jpeg";
import playFixedBg from "@/assets/righttoplay_fixed.jpeg";
// Scene 5: Right to Health
import healthBrokenBg from "@/assets/health_broken.jpeg";
import healthFixedBg from "@/assets/health_fixed.jpeg";

// Fisher-Yates shuffle algorithm for randomizing array order
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// SCENE DATA - Unordered solutions with zone-based validation
const SCENES = [
  {
    id: 1,
    title: "Right to Education",
    description: "Every child deserves quality education. Help unlock the gate, arrange the classroom, and assign a teacher to ensure learning happens!",
    brokenBg: "/assets/school-bg.png",
    fixedBg: "/assets/school-bg.png", // Using same for now
    bgColor: "#87CEEB",
    emoji: "🎓",
    brokenVisuals: ["lockedGate", "confusedChild", "emptyClassroom"],
    // ALL items in tray (correct + distractors) - shown together, ANY order works
    trayItems: [
      { id: "key", label: "Key", icon: "🔑" },
      { id: "desk", label: "Desk", icon: "🪑" },
      { id: "teacher", label: "Teacher", icon: "👩‍🏫" },
      { id: "book", label: "Book", icon: "📚" },
      { id: "apple", label: "Apple", icon: "🍎" },
      { id: "pencil", label: "Pencil", icon: "✏️" }
    ],
    // Mapping: which item goes to which drop zone (NO ORDER requirement)
    correctPlacements: {
      "key": "gate",
      "desk": "classroom",
      "teacher": "school"
    },
    // Drop zones - where items can be placed
    zones: [
      { id: "gate", label: "Unlock Gate" },
      { id: "classroom", label: "Arrange Classroom" },
      { id: "school", label: "Assign Teacher" }
    ],
    scoring: { action: 1, completion: 2 }
  },
  {
    id: 2,
    title: "Right to Safety",
    description: "Children have the right to live safely and be protected from harm. Install street lights, add security, and provide protective gear!",
    brokenBg: safetyBrokenBg,
    fixedBg: safetyFixedBg,
    bgColor: "#2C3E50",
    emoji: "🛡️",
    brokenVisuals: ["darkStreet", "scaredChild", "noProtection"],
    hasCustomVisuals: true, // Flag to render custom scene
    trayItems: [
      { id: "light", label: "Street Light", icon: "💡" },
      { id: "guard", label: "Security", icon: "👮" },
      { id: "helmet", label: "Helmet", icon: "⛑️" },
      { id: "cone", label: "Traffic Cone", icon: "🚧" },
      { id: "whistle", label: "Whistle", icon: "📣" },
      { id: "sign", label: "Stop Sign", icon: "🛑" }
    ],
    correctPlacements: {
      "light": "street",
      "guard": "safety",
      "helmet": "child"
    },
    zones: [
      { id: "street", label: "Light the Street" },
      { id: "safety", label: "Add Security" },
      { id: "child", label: "Protect Child" }
    ],
    scoring: { action: 1, completion: 2 }
  },
  {
    id: 3,
    title: "Right to Equality",
    description: "All children are equal regardless of abilities. Create an inclusive playground with welcome signs, inclusive activities, and accessible ramps!",
    brokenBg: equalityBrokenBg,
    fixedBg: equalityFixedBg,
    bgColor: "#7CB342",
    emoji: "⚖️",
    brokenVisuals: ["exclusivePlayground", "leftOutChild", "noAccess"],
    trayItems: [
      { id: "sign", label: "Welcome Sign", icon: "🪧" },
      { id: "hands", label: "Friendship", icon: "🤝" },
      { id: "ramp", label: "Ramp", icon: "♿" },
      { id: "bench", label: "Bench", icon: "🪑" },
      { id: "slide", label: "Slide", icon: "🛝" },
      { id: "fence", label: "Fence", icon: "🚧" }
    ],
    correctPlacements: {
      "sign": "entrance",
      "hands": "inclusion",
      "ramp": "access"
    },
    zones: [
      { id: "entrance", label: "Welcome All" },
      { id: "inclusion", label: "Include Everyone" },
      { id: "access", label: "Make Accessible" }
    ],
    scoring: { action: 1, completion: 2 }
  },
  {
    id: 4,
    title: "Right to Play",
    description: "Play is essential for children's development and happiness. Build fun equipment, create play spaces, and schedule dedicated playtime!",
    brokenBg: playBrokenBg,
    fixedBg: playFixedBg,
    bgColor: "#4CAF50",
    emoji: "🎮",
    brokenVisuals: ["barrenPlayground", "boredChild", "nothingToDo"],
    trayItems: [
      { id: "clock", label: "Play Time", icon: "⏰" },
      { id: "football", label: "Football", icon: "⚽" },
      { id: "swing", label: "Swing", icon: "🎡" },
      { id: "tree", label: "Tree", icon: "🌳" },
      { id: "cloud", label: "Cloud", icon: "☁️" },
      { id: "bird", label: "Bird", icon: "🐦" }
    ],
    correctPlacements: {
      "clock": "schedule",
      "football": "field",
      "swing": "playground"
    },
    zones: [
      { id: "schedule", label: "Set Play Time" },
      { id: "field", label: "Create Space" },
      { id: "playground", label: "Add Equipment" }
    ],
    scoring: { action: 1, completion: 2 }
  },
  {
    id: 5,
    title: "Right to Health",
    description: "Healthy children thrive and learn better. Provide clean water, medical checkups, and nutritious food to support their wellbeing!",
    brokenBg: healthBrokenBg,
    fixedBg: healthFixedBg,
    bgColor: "#E91E63",
    emoji: "🏥",
    brokenVisuals: ["emptyClinic", "weakChild", "noFood"],
    trayItems: [
      { id: "doctor", label: "Doctor", icon: "👨‍⚕️" },
      { id: "water", label: "Clean Water", icon: "💧" },
      { id: "fruits", label: "Fruits", icon: "🍎" },
      { id: "pill", label: "Medicine", icon: "💊" },
      { id: "bandage", label: "Bandage", icon: "🩹" },
      { id: "syringe", label: "Syringe", icon: "💉" }
    ],
    correctPlacements: {
      "doctor": "checkup",
      "water": "hydration",
      "fruits": "nutrition"
    },
    zones: [
      { id: "checkup", label: "Health Check" },
      { id: "hydration", label: "Provide Water" },
      { id: "nutrition", label: "Healthy Food" }
    ],
    scoring: { action: 1, completion: 2 }
  }
];

const BrokenStory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(
    () => parseInt(localStorage.getItem("brokenStoryScore") || "0")
  );
  const [fixedItems, setFixedItems] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [dropZonePositions, setDropZonePositions] = useState({});
  const [bonusAwarded, setBonusAwarded] = useState(false);
  const [rejectedItemId, setRejectedItemId] = useState(null); // For shake animation
  const [showCelebration, setShowCelebration] = useState(false); // Celebration state
  const [showCompletionModal, setShowCompletionModal] = useState(false); // Delayed completion popup
  const [sceneActionCount, setSceneActionCount] = useState(0); // Track actions in current scene
  const [shuffledTrayItems, setShuffledTrayItems] = useState([]); // Shuffled items for current scene
  
  // Store drop zone elements for measuring
  const dropZoneRefs = useRef({});
  const celebrationSoundRef = useRef(null);

  const currentScene = SCENES[currentSceneIndex];

  // Calculate completion - scene complete when ALL correct items are placed
  const correctItemCount = Object.keys(currentScene.correctPlacements).length;
  const placedCorrectCount = Object.keys(fixedItems).filter(
    id => currentScene.correctPlacements[id]
  ).length;
  const isLevelComplete =
    correctItemCount > 0 &&
    placedCorrectCount === correctItemCount;
  const progress = (placedCorrectCount / correctItemCount) * 100;

  // Persist score to localStorage
  useEffect(() => {
    localStorage.setItem("brokenStoryScore", totalScore.toString());
  }, [totalScore]);

  // Measure drop zones on mount and resize
  useEffect(() => {
    const handleResize = () => {
      // Re-measure all zones on resize by triggering a state update
      setDropZonePositions(prev => ({ ...prev }));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reset scene state when scene changes
  useEffect(() => {
    setFixedItems({});
    setShowHint(false);
    setBonusAwarded(false);
    setRejectedItemId(null);
    setShowCelebration(false);
    setShowCompletionModal(false);
    setSceneActionCount(0); // Reset action count for new scene
    dropZoneRefs.current = {};
    setDropZonePositions({});
    // Shuffle tray items for new scene to make game unpredictable
    setShuffledTrayItems(shuffleArray(currentScene.trayItems));
  }, [currentSceneIndex, currentScene.trayItems]);

  // Trigger celebration when scene is completed, then show modal after delay
  useEffect(() => {
    // EXPLICIT GUARD: sceneActionCount must be > 0 to prevent premature completion
    if (sceneActionCount === 0) return;
    
    if (
      isLevelComplete &&
      !showCelebration &&
      !showCompletionModal
    ) {
      setShowCelebration(true);
      
      // Play celebration sound (soft, one-time)
      try {
        // Force create new audio with updated sound
        celebrationSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        celebrationSoundRef.current.volume = 0.35; // Soft, kid-friendly volume
        celebrationSoundRef.current.currentTime = 0;
        celebrationSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
      } catch (error) {
        console.log('Audio not supported:', error);
      }

      // Hide celebration after 2 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);

      // Show completion modal after 2.5 seconds (after celebration finishes)
      setTimeout(() => {
        setShowCompletionModal(true);
      }, 2500);
    }
  }, [sceneActionCount, isLevelComplete, showCelebration, showCompletionModal]);

  // Validate drop: Check if item matches the zone's expected item
  const checkDropZone = (itemId, dragX, dragY) => {
    // Only accept if item is a correct placement AND not already placed
    if (!currentScene.correctPlacements[itemId] || fixedItems[itemId]) {
      return false; // Distractor item or already placed
    }

    // Get the zone this item should go to
    const correctZoneId = currentScene.correctPlacements[itemId];
    const zone = dropZonePositions[correctZoneId];
    
    if (!zone) return false;

    // Calculate distance from center of drop zone
    const distX = dragX - zone.x;
    const distY = dragY - zone.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Accept if within 300px of correct zone
    return distance < 300;
  };

  const handleItemDropped = (itemId, dragX, dragY) => {
    const isValid = checkDropZone(itemId, dragX, dragY);
    
    if (isValid) {
      // ✅ CORRECT - Item placed on its correct zone
      setSceneActionCount(prev => prev + 1); // Increment action count
      const item = currentScene.trayItems.find(i => i.id === itemId);
      setFixedItems(prev => ({ ...prev, [itemId]: true }));
      setTotalScore(prev => prev + currentScene.scoring.action);
      
      toast({
        title: "✓ Correct!",
        description: `${item.label} placed correctly. +${currentScene.scoring.action} point`,
      });
      return true;
    } else {
      // ❌ REJECTED - Trigger shake animation
      setRejectedItemId(itemId);
      setTimeout(() => setRejectedItemId(null), 500);

      toast({
        title: "Not quite!",
        description: "This item belongs somewhere else.",
      });
      return false;
    }
  };

  const handleNextScene = () => {
    // CRITICAL: Close modal and celebration before transitioning
    setShowCompletionModal(false);
    setShowCelebration(false);
    
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      // All scenes complete
      localStorage.setItem("brokenStoryScore", totalScore.toString());
      navigate("/games");
    }
  };

  // Award bonus for completing without hints
  useEffect(() => {
    if (isLevelComplete && !showHint && !bonusAwarded) {
      const bonus = currentScene.scoring.completion;
      setTotalScore(prev => prev + bonus);
      setBonusAwarded(true);
      toast({
        title: "🎉 Perfect!",
        description: `Scene completed! +${bonus} bonus point`,
      });
    }
  }, [isLevelComplete, showHint, bonusAwarded, currentScene.scoring.completion, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-50 font-sans">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start md:items-center gap-4 flex-col md:flex-row">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl">{currentScene.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Scene {currentScene.id} of {SCENES.length}</p>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-800">
                    {currentScene.title}
                  </h1>
                </div>
              </div>
              <p className="text-base text-slate-600">{currentScene.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center bg-white rounded-lg px-4 py-2 shadow border-2 border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Score</p>
                <p className="text-2xl font-black text-slate-800">{totalScore}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setShowHint(!showHint)} 
                  variant="outline"
                  className="rounded-lg h-12 w-12 border-2"
                >
                  <Lightbulb className="w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div className="mt-6 bg-slate-200 rounded-lg p-1 shadow-sm h-8">
            <motion.div
              className="h-full bg-slate-700 rounded-md flex items-center justify-center text-white font-semibold text-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            >
              {placedCorrectCount > 0 && `${Math.round(progress)}%`}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Game Container */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[600px]">
          
          {/* Left Sidebar - Instructions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-64 flex-shrink-0"
          >
            <Card className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl h-full">
              <div className="mb-4">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-3">How to Play</p>
                <ol className="text-sm text-slate-700 space-y-3">
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                    <span>Drag items from the right sidebar</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                    <span>Drop in matching zones (bottom)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                    <span>Complete all {correctItemCount} objectives</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                    <span>Progress through all {SCENES.length} scenes</span>
                  </li>
                </ol>
              </div>
              
              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Progress</p>
                <div className="space-y-2">
                  {currentScene.zones.map(zone => {
                    const itemForZone = Object.entries(currentScene.correctPlacements).find(
                      ([itemId, zoneId]) => zoneId === zone.id && fixedItems[itemId]
                    );
                    return (
                      <div 
                        key={zone.id}
                        className={`text-xs p-2 rounded ${itemForZone ? 'bg-green-100 text-green-700 font-semibold' : 'bg-white text-slate-600'}`}
                      >
                        {itemForZone ? '✓' : '○'} {zone.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Center - Game Arena */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 rounded-2xl overflow-hidden shadow-xl bg-white flex flex-col min-h-[600px] border border-slate-200"
          >
            
            {/* Main Scene Area */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-8 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
              
              {/* Scene Background - Switches between BROKEN and FIXED */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: typeof (isLevelComplete ? currentScene.fixedBg : currentScene.brokenBg) === 'string' 
                    ? `url('${isLevelComplete ? currentScene.fixedBg : currentScene.brokenBg}')` 
                    : `url(${isLevelComplete ? currentScene.fixedBg : currentScene.brokenBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: currentScene.bgColor,
                  transition: 'all 0.8s ease-in-out'
                }}
              />

              {/* Scene 2: Safety Scene - Custom Visual Elements */}
              {currentScene.id === 2 && currentScene.hasCustomVisuals && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Unsafe elements (garbage/tools) - disappear when guard is placed */}
                  <AnimatePresence>
                    {!fixedItems['guard'] && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute bottom-24 left-10 text-6xl"
                      >
                        🗑️
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {!fixedItems['guard'] && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute bottom-24 right-10 text-6xl"
                      >
                        🔧
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Street light glow effect when light is placed */}
                  <AnimatePresence>
                    {fixedItems['light'] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-10 right-20 text-7xl"
                      >
                        💡
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-yellow-300/30 rounded-full blur-3xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Security guard when placed */}
                  <AnimatePresence>
                    {fixedItems['guard'] && (
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute bottom-24 left-20 text-7xl"
                      >
                        👮
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Safe zone indicator when helmet is placed */}
                  <AnimatePresence>
                    {fixedItems['helmet'] && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-32 right-32 text-5xl"
                      >
                        <div className="relative">
                          ⛑️
                          <div className="absolute -inset-4 border-4 border-green-400 rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Large Lock Overlay - Covers entire image until first item is placed */}
              <AnimatePresence>
                {placedCorrectCount === 0 && currentScene.id !== 2 && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-8xl mb-4 drop-shadow-lg"
                      >
                        🔒
                      </motion.div>
                      <p className="text-xl font-semibold text-white">
                        {currentScene.id === 1 ? 'School Locked' : 'Scene Locked'}
                      </p>
                      <p className="text-sm text-slate-200 mt-2">Start placing items to repair</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 pointer-events-none" />

              {/* Hint Overlay */}
              <AnimatePresence>
                {showHint && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="absolute top-6 z-30 px-6"
                  >
                    <div className="bg-slate-900 text-white rounded-lg shadow-lg p-4 max-w-sm">
                      <p className="text-sm font-medium">
                        {getHintText()}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Student Illustration */}
              <div className="relative z-10">
                <motion.div
                  animate={isLevelComplete ? { y: [0, -15, 0] } : { x: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl"
                >
                  {isLevelComplete ? '😊' : '😢'}
                </motion.div>
                <p className="text-center text-slate-600 mt-2 text-sm font-semibold">
                  {placedCorrectCount}/{correctItemCount} Complete
                </p>
              </div>

              {/* Celebration Effect - Triggers on scene completion */}
              <AnimatePresence>
                {showCelebration && (
                  <>
                    {/* Celebration Text */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.3, 1],
                        opacity: [0, 1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute top-20 z-30"
                    >
                      <div className="text-6xl font-black text-yellow-400 drop-shadow-2xl" style={{
                        textShadow: '3px 3px 0px #FF6B9D, 6px 6px 0px #C44569'
                      }}>
                        Yayy!! 🎉
                      </div>
                    </motion.div>

                    {/* Background Glow Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-gradient-radial from-yellow-200/50 via-green-200/30 to-transparent z-5"
                    />

                    {/* Confetti-like particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          opacity: 1,
                          scale: 1
                        }}
                        animate={{ 
                          x: Math.cos(i * 45 * Math.PI / 180) * 150,
                          y: Math.sin(i * 45 * Math.PI / 180) * 150,
                          opacity: 0,
                          scale: 0
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute z-20 text-4xl"
                        style={{ 
                          top: '50%', 
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {['⭐', '✨', '🌟', '💫', '🎊', '🎉', '🌈', '💝'][i]}
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Drop Zones at Bottom */}
            <div className="bg-slate-50 border-t-2 border-slate-200 p-6 flex gap-4 justify-center flex-wrap lg:flex-nowrap">
              <div className="text-center mb-2 hidden lg:block w-full absolute -top-6 left-1/2 -translate-x-1/2">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Drop Zones</p>
              </div>
              {currentScene.zones.map(zone => {
                const itemPlaced = Object.entries(currentScene.correctPlacements).find(
                  ([itemId, zoneId]) => zoneId === zone.id && fixedItems[itemId]
                )?.[0];
                return (
                  <DropZone 
                    key={zone.id}
                    ref={(zoneData) => {
                      if (zoneData) {
                        setDropZonePositions(prev => ({
                          ...prev,
                          [zoneData.id]: {
                            x: zoneData.x,
                            y: zoneData.y,
                            width: zoneData.width,
                            height: zoneData.height
                          }
                        }));
                      }
                    }}
                    zoneId={zone.id}
                    label={zone.label} 
                    isFixed={!!itemPlaced}
                  />
                );
              })}
            </div>

          </motion.div>

          {/* Right Sidebar - Draggable Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-72 flex-shrink-0"
          >
            <Card className="p-6 bg-slate-50 border-2 border-slate-200 rounded-xl h-full">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-6">Available Items</p>
              <div className="flex lg:flex-col gap-4 justify-center flex-wrap">
                {shuffledTrayItems.map(item => (
                  !fixedItems[item.id] && (
                    <DraggableItem 
                      key={item.id}
                      id={item.id} 
                      label={item.label}
                      icon={item.icon}
                      isRejected={rejectedItemId === item.id}
                      onDrop={(itemId, x, y) => handleItemDropped(itemId, x, y)} 
                    />
                  )
                ))}
                {isLevelComplete && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-center py-4"
                  >
                    <p className="text-green-600 font-semibold text-sm">✓ All Complete!</p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Winning Modal - Outside Game Container */}
        <AnimatePresence>
          {showCompletionModal && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="flex items-center justify-center"
              >
                <Card className="max-w-md w-full p-10 text-center shadow-2xl border-2 border-slate-200 bg-white">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3 }}>
                    <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  </motion.div>
                  <Badge variant="secondary" className="mb-6 py-2 px-6 text-base">
                    Scene {currentScene.id} of {SCENES.length} Complete
                  </Badge>
                  <h2 className="text-4xl font-black text-slate-800 mb-4">
                    Excellent Work!
                  </h2>
                  <p className="text-slate-600 mb-4 text-base leading-relaxed">
                    You've successfully repaired the scene and protected the {currentScene.title}!
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-2xl font-black text-slate-800">Score: {totalScore}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {currentSceneIndex < SCENES.length - 1 
                        ? `${SCENES.length - currentSceneIndex - 1} scene${SCENES.length - currentSceneIndex - 1 > 1 ? 's' : ''} remaining` 
                        : 'All scenes complete!'}
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full gap-2 text-base py-6" 
                    onClick={handleNextScene}
                  >
                    {currentSceneIndex < SCENES.length - 1 ? 'Next Scene' : 'Finish Game'} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

// Draggable Item Component - WITH SHAKE ANIMATION ON REJECTION
const DraggableItem = ({ id, label, icon, isRejected, onDrop }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  // Shake animation when rejected
  useEffect(() => {
    if (isRejected) {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
    }
  }, [isRejected, controls]);

  const handleDragEnd = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const success = onDrop(id, centerX, centerY);

    if (!success) {
      // ❌ REJECTED - Snap back with shake animation
      controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      ref={ref}
      drag
      animate={controls}
      onDragEnd={handleDragEnd}
      dragElastic={0.2}
      dragMomentum={false}
      whileDrag={{ scale: 1.15, boxShadow: "0 15px 40px rgba(0,0,0,0.3)", zIndex: 50 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3 cursor-grab active:cursor-grabbing select-none"
    >
      <div className={`w-20 h-20 rounded-xl shadow-md flex items-center justify-center text-4xl bg-white border-2 transition-colors ${
        isRejected ? 'border-red-400 bg-red-50' : 'border-slate-300 hover:border-slate-400'
      }`}>
        {icon}
      </div>
      <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{label}</p>
    </motion.div>
  );
};

// Drop Zone Component  
const DropZone = React.forwardRef(({ zoneId, label, isFixed }, ref) => {
  const zoneRef = useRef(null);
  
  useEffect(() => {
    if (zoneRef.current) {
      const rect = zoneRef.current.getBoundingClientRect();
      // Store position in parent's ref via callback
      if (typeof ref === 'function') {
        ref({
          id: zoneId,
          element: zoneRef.current,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        });
      }
    }
  }, [ref, zoneId]);

  return (
    <motion.div
      ref={zoneRef}
      className={`flex-1 lg:flex-none lg:min-w-[200px] rounded-lg border-2 flex flex-col items-center justify-center py-8 lg:py-12 px-6 transition-all duration-300 ${
        isFixed
          ? 'bg-green-50 border-green-300 shadow-md'
          : 'bg-white border-slate-300 border-dashed hover:bg-slate-50 hover:border-slate-400'
      }`}
    >
      {isFixed ? (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="flex flex-col items-center gap-2"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
          <span className="text-xs font-semibold text-green-700 uppercase text-center">{label}</span>
        </motion.div>
      ) : (
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-xs text-slate-400 mt-2">Drop here</p>
        </div>
      )}
    </motion.div>
  );
});

DropZone.displayName = 'DropZone';

export default BrokenStory;