
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { schoolLevels } from "./schoolElements";
import ElementCard from "./ElementCard";
import SchoolCanvas from "./SchoolCanvas";
import PopupCard from "./PopupCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import API_BASE_URL from "@/config/api";

// Import level completion images
import level1Img from "@/assets/schoolLevels/level1.png";
import level2Img from "@/assets/schoolLevels/level2.png";
import level3Img from "@/assets/schoolLevels/level3.png";
import level4Img from "@/assets/schoolLevels/level4.png";
import level5Img from "@/assets/schoolLevels/level5.png";
import level6Img from "@/assets/schoolLevels/level6.png";

// Celebration sound URL
const CELEBRATION_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3";

// Level completion images map
const levelImages = {
  1: level1Img,
  2: level2Img,
  3: level3Img,
  4: level4Img,
  5: level5Img,
  6: level6Img,
};

const UNLOCK_KEY = "buildSchoolLevel";

const getUnlockedLevel = () => {
  const stored = Number(localStorage.getItem(UNLOCK_KEY));
  return Number.isFinite(stored) && stored > 0 ? stored : 1;
};

// Helper: get initial unlocked ids for a level (first 2 rights-based, 1 fun)
const getInitialUnlocked = (levelIdx = 0) => {
  const elements = schoolLevels[levelIdx].elements;
  const rights = elements.filter(e => e.type === "important").slice(0,2).map(e => e.id);
  const fun = elements.find(e => e.type !== "important");
  return fun ? [...rights, fun.id] : rights;
};

function shuffleArray(array) {
  // Fisher-Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function BuildYourSchool(){
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Parse level from route param (id is 1-based levelNumber)
  const levelNumber = Number(id) || 1;
  const levelIdxFromRoute = levelNumber - 1;
  
  // Level index state - initialized from route param
  const [levelIdx, setLevelIdx] = useState(levelIdxFromRoute);
  
  // Anti-cheat: redirect if level is not unlocked
  useEffect(() => {
    const unlockedLevel = getUnlockedLevel();
    if (levelNumber > unlockedLevel || levelIdxFromRoute < 0 || levelIdxFromRoute >= schoolLevels.length) {
      navigate("/games/build-your-school");
    }
  }, [levelNumber, levelIdxFromRoute, navigate]);
  
  // Update levelIdx and reset state when route id changes
  useEffect(() => {
    if (levelIdxFromRoute >= 0 && levelIdxFromRoute < schoolLevels.length) {
      setLevelIdx(levelIdxFromRoute);
      setUnlocked(getInitialUnlocked(levelIdxFromRoute));
      setBuiltElements([]);
      setStars(0);
    }
  }, [id]);

  // Level state
  const [unlocked, setUnlocked] = useState(() => getInitialUnlocked(levelIdxFromRoute));
  const [builtElements, setBuiltElements] = useState([]);
  const [popup, setPopup] = useState(null);
  const [stars, setStars] = useState(0);
  
  // Celebration states (like BrokenStory)
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLevelCompleteModal, setShowLevelCompleteModal] = useState(false);
  const celebrationRef = useRef(false);
  
  // Personalization - load from localStorage if exists
  const [mascot, setMascot] = useState(() => localStorage.getItem("buildSchoolMascot") || "owl");
  const [theme, setTheme] = useState(() => localStorage.getItem("buildSchoolTheme") || "blue");
  const [schoolName, setSchoolName] = useState(() => localStorage.getItem("buildSchoolName") || "");
  
  // Only show personalization on Level 1 if not already set
  const [showPersonalize, setShowPersonalize] = useState(() => {
    const savedName = localStorage.getItem("buildSchoolName");
    return levelNumber === 1 && !savedName;
  });
  
  // Sync personalization from localStorage when navigating between levels
  useEffect(() => {
    const savedMascot = localStorage.getItem("buildSchoolMascot");
    const savedTheme = localStorage.getItem("buildSchoolTheme");
    const savedName = localStorage.getItem("buildSchoolName");
    
    if (savedMascot) setMascot(savedMascot);
    if (savedTheme) setTheme(savedTheme);
    if (savedName) setSchoolName(savedName);
    
    // Only show personalization on Level 1 if not already personalized
    setShowPersonalize(levelNumber === 1 && !savedName);
    
    // Reset celebration state when level changes
    setShowCelebration(false);
    setShowLevelCompleteModal(false);
    celebrationRef.current = false;
  }, [id, levelNumber]);

  const mascots = [
    { id: "owl", label: "Owl", icon: "🦉" },
    { id: "bear", label: "Bear", icon: "🧸" },
    { id: "robot", label: "Robot", icon: "🤖" },
    { id: "bunny", label: "Bunny", icon: "🐰" },
  ];
  const themes = [
    { id: "blue", label: "Blue", color: "bg-blue-200" },
    { id: "green", label: "Green", color: "bg-green-200" },
    { id: "pink", label: "Pink", color: "bg-pink-200" },
    { id: "yellow", label: "Yellow", color: "bg-yellow-200" },
  ];

  const [shuffledElements, setShuffledElements] = useState(() => shuffleArray(schoolLevels[levelIdxFromRoute]?.elements || []));
  const currentLevel = schoolLevels[levelIdx] 
    ? { ...schoolLevels[levelIdx], elements: shuffledElements }
    : { name: "", elements: [] };
  const totalImportant = currentLevel.elements.filter(e => e.type === "important").length;

  // Shuffle elements when levelIdx state changes
  useEffect(() => {
    if (schoolLevels[levelIdx]) {
      setShuffledElements(shuffleArray(schoolLevels[levelIdx].elements));
    }
  }, [levelIdx]);

  // Helper: get unlocks for a card (default: 2 rights, 1 fun, not already unlocked)
  const getNextUnlocks = (currentUnlocked) => {
    const elements = currentLevel.elements;
    const nextRights = elements.filter(e => e.type === "important" && !currentUnlocked.includes(e.id) && !builtElements.some(b => b.id === e.id)).slice(0,2).map(e => e.id);
    const nextFun = elements.find(e => e.type !== "important" && !currentUnlocked.includes(e.id) && !builtElements.some(b => b.id === e.id));
    return nextFun ? [...nextRights, nextFun.id] : nextRights;
  };

  // Max elements allowed to place
  const MAX_ELEMENTS = 5;

  // Place a card
  const addElement = (element) => {
    if (builtElements.some(e => e.id === element.id)) return;

    // Check if max limit reached
    if (builtElements.length >= MAX_ELEMENTS) {
      setPopup({
        title: "⚠️ Limit Reached!",
        message: "You can only place 5 elements. Remove one to add a new one!",
        type: "hint",
      });
      return;
    }

    // Count unlocked but unplaced cards
    const unlockedUnplaced = currentLevel.elements.filter(e => unlocked.includes(e.id) && !builtElements.some(b => b.id === e.id));
    // If only 2 unlocked and unplaced remain, and wrong card is chosen, restart
    if (
      unlockedUnplaced.length === 2 &&
      element.type !== "important"
    ) {
      setPopup({
        title: "🔄 Try Again!",
        message: "You need to pick the right elements to finish building your school. Let's start over!",
        type: "restart",
      });
      setTimeout(() => {
        setUnlocked(getInitialUnlocked(levelIdx));
        setBuiltElements([]);
        setStars(0);
        setPopup(null);
      }, 1800);
      return;
    }

    setBuiltElements(prev => [...prev, element]);

    if (element.type === "important") {
      setStars(prev => prev + 1);
      setPopup({
        title: `🎯 Right Unlocked: ${element.right}`,
        message: element.explanation,
        type: "success",
      });
      // Confetti effect
      if (window && window.confetti) {
        window.confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      // Unlock more cards
      setUnlocked(prev => [...prev, ...getNextUnlocks([...prev, element.id])]);
    } else {
      // Relock a random unlocked, unplaced card (not the one just placed)
      const relockable = unlockedUnplaced.filter(e => e.id !== element.id);
      if (relockable.length > 0) {
        const toRelock = relockable[Math.floor(Math.random() * relockable.length)].id;
        setUnlocked(prev => prev.filter(id => id !== toRelock));
        setPopup({
          title: "🔒 Oops!",
          message: "One of your unlocked cards is now locked again. Try to pick the most important elements!",
          type: "hint",
        });
      } else {
        setPopup({
          title: "💡 Think Again",
          message: element.hint,
          type: "hint",
        });
      }
    }
  };

  // Remove from canvas
  const deleteElement = (element) => {
    setBuiltElements(prev => prev.filter(e => e.id !== element.id));
    if (element.type === "important") {
      setStars(prev => Math.max(prev - 1, 0));
    }
    // Optionally: lock again? (for now, keep unlocked)
  };

  const levelCompleted = stars === totalImportant && totalImportant > 0;
  const allLevelsCompleted = levelIdx === schoolLevels.length - 1 && levelCompleted;

  // Celebration + modal flow (like BrokenStory)
  useEffect(() => {
    if (levelCompleted && !celebrationRef.current) {
      celebrationRef.current = true;
      setShowCelebration(true);

      // Play celebration sound
      try {
        const audio = new Audio(CELEBRATION_SOUND_URL);
        audio.volume = 0.35;
        audio.play().catch(() => {});
      } catch {}

      // 🔥 Save badge to database
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        fetch(`${API_BASE_URL}/api/badges/earn`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userData.id,
            gameType: "buildSchool",
            levelId: levelNumber,
            badge: currentLevel?.badge || `Level ${levelNumber} Badge`,
          }),
        }).catch(console.error);
      }

      // Hide "Yayy!" text after 2 seconds, image stays visible
      setTimeout(() => setShowCelebration(false), 2000);
      // Show modal after 5 seconds (image visible for 3 more seconds after Yayy disappears)
      setTimeout(() => setShowLevelCompleteModal(true), 5000);
    }
  }, [levelCompleted, levelNumber, currentLevel?.badge]);

  return (
    <>
      <Navbar />
      {showPersonalize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-2">Personalize Your School!</h2>
            <div>
              <label className="block font-semibold mb-1">Choose a Mascot:</label>
              <div className="flex gap-3 justify-center">
                {mascots.map(m => (
                  <button
                    key={m.id}
                    className={`text-3xl p-2 rounded-full border-2 ${mascot === m.id ? 'border-blue-500 bg-blue-100' : 'border-transparent'} transition`}
                    onClick={() => setMascot(m.id)}
                  >
                    <span>{m.icon}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Pick a Color Theme:</label>
              <div className="flex gap-3 justify-center">
                {themes.map(t => (
                  <button
                    key={t.id}
                    className={`w-8 h-8 rounded-full border-2 ${theme === t.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'} ${t.color}`}
                    onClick={() => setTheme(t.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Name Your School:</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-lg"
                placeholder="e.g. Happy Minds School"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                maxLength={32}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white rounded-lg py-2 font-bold text-lg mt-2 hover:bg-blue-600 transition"
              disabled={!schoolName.trim()}
              onClick={() => {
                // Save personalization to localStorage
                localStorage.setItem("buildSchoolMascot", mascot);
                localStorage.setItem("buildSchoolTheme", theme);
                localStorage.setItem("buildSchoolName", schoolName.trim());
                setShowPersonalize(false);
              }}
            >
              Start Building!
            </button>
          </div>
        </div>
      )}
      <DndProvider backend={HTML5Backend}>
        <div className={`p-6 space-y-6 min-h-screen transition-colors duration-300 ${theme === 'blue' ? 'bg-blue-50' : theme === 'green' ? 'bg-green-50' : theme === 'pink' ? 'bg-pink-50' : theme === 'yellow' ? 'bg-yellow-50' : ''}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-center flex-1">
              🏫 {schoolName ? schoolName : 'Build Your School'}
            </h1>
            <span className="text-3xl ml-4">{mascots.find(m => m.id === mascot)?.icon}</span>
          </div>
          <p className="text-center text-muted-foreground">
            Think carefully and design a safe & fair school for children
          </p>
          {/* PROGRESS */}
          <div className="flex items-center gap-4">
            {/* Elements placed progress */}
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>🏗️ Elements Placed</span>
                <span className="font-bold">{builtElements.length} / {MAX_ELEMENTS}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${(builtElements.length / MAX_ELEMENTS) * 100}%` }}
                />
              </div>
            </div>
            {/* Rights unlocked progress */}
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>⭐ Rights Unlocked</span>
                <span className="font-bold">{stars} / {totalImportant}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${(stars / totalImportant) * 100}%` }}
                />
              </div>
            </div>
          </div>
          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-2 gap-6">
            {/* LEFT: Card Shelf */}
            <div className="grid grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-2">
              {currentLevel.elements.map((el) => (
                <ElementCard
                  key={el.id}
                  element={el}
                  onAdd={addElement}
                  unlocked={unlocked.includes(el.id)}
                  placed={builtElements.some(b => b.id === el.id)}
                />
              ))}
            </div>
            {/* RIGHT: School Canvas or Completion Image */}
            {levelCompleted ? (
              <div className="rounded-xl min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Final Level Image - covers entire canvas */}
                <img 
                  src={levelImages[levelNumber] || levelImages[1]} 
                  alt={`Level ${levelNumber} Complete`}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                
                {/* Celebration Text Overlay */}
                {showCelebration && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl z-10">
                    <div className="text-center animate-bounce">
                      <div className="text-7xl mb-3">🎉</div>
                      <h2 className="text-5xl font-black text-white drop-shadow-lg">
                        Yayy!
                      </h2>
                      <p className="text-2xl font-bold text-yellow-300 mt-2 drop-shadow-lg">
                        School Completed!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <SchoolCanvas
                builtElements={builtElements}
                onDelete={deleteElement}
                schoolName={schoolName}
                mascot={mascots.find(m => m.id === mascot)?.icon}
              />
            )}
          </div>
          {popup && !levelCompleted && (
            <PopupCard
              title={popup.title}
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup(null)}
            />
          )}
          {showLevelCompleteModal && !allLevelsCompleted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Card className="w-96 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold mb-2">Congratulations!</h3>
                  <p className="text-xl font-semibold text-primary mb-4">
                    Level {levelNumber} Complete! 🌟
                  </p>
                  <p className="text-muted-foreground mb-4">You finished building: <b>{currentLevel.name}</b></p>
                  
                  {/* Badge earned */}
                  <div className="flex flex-col items-center mb-6 mt-2 w-full">
                    <div className="flex justify-center w-full">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 font-bold text-base px-6 py-2 rounded-full shadow border-2 border-yellow-400 whitespace-nowrap">
                        {currentLevel.badge && (
                          <>
                            {currentLevel.badge.split(" ")[0]}
                            <span className="ml-2">You earned a <span className="underline decoration-yellow-600">{currentLevel.badge.replace(/^[^ ]+ /, "")}</span> badge!</span>
                          </>
                        )}
                      </span>
                    </div>
                    <span className="text-xs text-yellow-700 font-semibold mt-2 text-center block">Keep building, School Architect! 🏗️</span>
                  </div>
                  
                  <button className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition" onClick={() => {
                    // Unlock next level
                    const nextLevel = levelNumber + 1;
                    const currentUnlocked = getUnlockedLevel();
                    if (nextLevel > currentUnlocked) {
                      localStorage.setItem(UNLOCK_KEY, String(nextLevel));
                    }
                    // Redirect to levels page
                    navigate("/games/build-your-school");
                  }}>Next Level 🚀</button>
                  <button
                    onClick={() => navigate("/games")}
                    className="w-full mt-3 px-8 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition"
                  >
                    🏠 Go to Games
                  </button>
                </CardContent>
              </Card>
            </div>
          )}
          {showLevelCompleteModal && allLevelsCompleted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Card className="w-96 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-3xl font-bold mb-2">Amazing Work!</h3>
                  <p className="text-xl font-semibold text-primary mb-4">
                    All Levels Complete! 🌟
                  </p>
                  <p className="text-muted-foreground mb-4">You didn't just build a school —<br/>you built a fair and safe place for children 💙</p>
                  
                  {/* Final Badge earned */}
                  <div className="flex flex-col items-center mb-6 mt-2 w-full">
                    <div className="flex justify-center w-full">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 font-bold text-base px-6 py-2 rounded-full shadow border-2 border-yellow-400 whitespace-nowrap">
                        {currentLevel.badge && (
                          <>
                            {currentLevel.badge.split(" ")[0]}
                            <span className="ml-2">You earned a <span className="underline decoration-yellow-600">{currentLevel.badge.replace(/^[^ ]+ /, "")}</span> badge!</span>
                          </>
                        )}
                      </span>
                    </div>
                    <div className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full border-2 border-purple-300">
                      <span className="text-purple-800 font-bold">🎓 Master School Builder</span>
                    </div>
                    <span className="text-xs text-yellow-700 font-semibold mt-2 text-center block">Keep going, Rights Champion!</span>
                  </div>
                  
                  <button className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition" onClick={() => {
                    // Mark all levels complete
                    const totalLevels = schoolLevels.length;
                    const currentUnlocked = getUnlockedLevel();
                    if (totalLevels + 1 > currentUnlocked) {
                      localStorage.setItem(UNLOCK_KEY, String(totalLevels + 1));
                    }
                    navigate("/games/build-your-school");
                  }}>Restart Game 🔄</button>
                  <button
                    onClick={() => navigate("/games")}
                    className="w-full mt-3 px-8 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition"
                  >
                    🏠 Go to Games
                  </button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DndProvider>
      <Footer />
    </>
  );
}



