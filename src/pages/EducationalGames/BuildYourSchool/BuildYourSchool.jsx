
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { schoolLevels } from "./schoolElements";
import { useEffect, useRef } from "react";
import ElementCard from "./ElementCard";
import SchoolCanvas from "./SchoolCanvas";
import PopupCard from "./PopupCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  // Level state
  const [levelIdx, setLevelIdx] = useState(0);
  const [unlocked, setUnlocked] = useState(getInitialUnlocked(0));
  const [builtElements, setBuiltElements] = useState([]);
  const [popup, setPopup] = useState(null);
  const [stars, setStars] = useState(0);
  const [showPersonalize, setShowPersonalize] = useState(true);
  const [mascot, setMascot] = useState("owl");
  const [theme, setTheme] = useState("blue");
  const [schoolName, setSchoolName] = useState("");

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

  const [shuffledElements, setShuffledElements] = useState(() => shuffleArray(schoolLevels[0].elements));
  const currentLevel = { ...schoolLevels[levelIdx], elements: shuffledElements };
  const totalImportant = currentLevel.elements.filter(e => e.type === "important").length;

  // Shuffle elements when level changes
  useEffect(() => {
    setShuffledElements(shuffleArray(schoolLevels[levelIdx].elements));
  }, [levelIdx]);

  // Helper: get unlocks for a card (default: 2 rights, 1 fun, not already unlocked)
  const getNextUnlocks = (currentUnlocked) => {
    const elements = currentLevel.elements;
    const nextRights = elements.filter(e => e.type === "important" && !currentUnlocked.includes(e.id) && !builtElements.some(b => b.id === e.id)).slice(0,2).map(e => e.id);
    const nextFun = elements.find(e => e.type !== "important" && !currentUnlocked.includes(e.id) && !builtElements.some(b => b.id === e.id));
    return nextFun ? [...nextRights, nextFun.id] : nextRights;
  };

  // Place a card
  const addElement = (element) => {
    if (builtElements.some(e => e.id === element.id)) return;

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

  const levelCompleted = stars === totalImportant;
  const allLevelsCompleted = levelIdx === schoolLevels.length - 1 && levelCompleted;

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
              onClick={() => setShowPersonalize(false)}
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
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(stars / totalImportant) * 100}%` }}
            />
          </div>
          <p className="text-sm text-center">
            ⭐ {stars} / {totalImportant} rights unlocked
          </p>
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
            {/* RIGHT: School Canvas */}
            <SchoolCanvas
              builtElements={builtElements}
              onDelete={deleteElement}
              schoolName={schoolName}
              mascot={mascots.find(m => m.id === mascot)?.icon}
            />
          </div>
          {popup && (
            <PopupCard
              title={popup.title}
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup(null)}
            />
          )}
          {levelCompleted && !allLevelsCompleted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-yellow-100 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center animate-bounceIn">
                <h2 className="text-3xl font-bold mb-2">🎉 Level Complete!</h2>
                <p className="text-lg mb-2">You finished building: <b>{currentLevel.name}</b></p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition" onClick={() => {
                  setLevelIdx(levelIdx + 1);
                  setUnlocked(getInitialUnlocked(levelIdx + 1));
                  setBuiltElements([]);
                  setStars(0);
                }}>Next Level</button>
              </div>
            </div>
          )}
          {allLevelsCompleted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-green-100 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center animate-bounceIn">
                <h2 className="text-3xl font-bold mb-2">🏆 Amazing Work!</h2>
                <p className="text-lg mb-2">You didn’t just build a school —<br/>you built a fair and safe place for children 💙</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition" onClick={() => window.location.reload()}>Build Again</button>
              </div>
            </div>
          )}
        </div>
      </DndProvider>
      <Footer />
    </>
  );
}



