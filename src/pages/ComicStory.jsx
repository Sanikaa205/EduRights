import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { comicStories } from "@/data/comicStories";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ComicStory = () => {
  const { id } = useParams();
  const story = comicStories[id];

  const [currentPanel, setCurrentPanel] = useState(0);
  const [choiceResult, setChoiceResult] = useState(null);
  const [choiceLocked, setChoiceLocked] = useState(false);

  if (!story) return <div className="p-10 text-center">Comic not found 😢</div>;

  const panel = story.panels[currentPanel];
  if (!panel) return null;

  const progress = ((currentPanel + 1) / story.panels.length) * 100;

  /* 🌈 BACKGROUND SCENES */
  const sceneBg = {
    happy: "from-sky-300 to-emerald-200",
    warning: "from-yellow-200 to-orange-200",
    important: "from-red-200 to-pink-200",
    celebrate: "from-green-200 to-teal-200",
    choice: "from-indigo-200 to-purple-200",
    boost: "from-indigo-300 to-pink-300",
  }[panel.type] || "from-blue-200 to-purple-200";

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-6"
        >
          {story.title}
        </motion.h1>

        {/* PROGRESS */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* 🌟 STORYBOOK LAYOUT */}
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* 🎭 ANIMATED SCENE */}
          <motion.div
            key={currentPanel}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`h-[320px] rounded-3xl bg-gradient-to-br ${sceneBg} flex items-center justify-center relative overflow-hidden`}
          >
            {/* Floating sparkles */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-6 right-6 text-2xl"
            >
              ✨
            </motion.div>

            {/* CHARACTER */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: panel.type === "celebrate" ? [0, 10, -10, 0] : 0,
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl"
            >
              {panel.character || "🦊"}
            </motion.div>
          </motion.div>

          {/* 💬 SPEECH BUBBLE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPanel}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-card p-6 rounded-3xl shadow-xl relative"
            >
              <span className="absolute -left-3 top-8 text-3xl">💬</span>

              {/* CONTENT */}
              {panel.type === "boost" ? (
                <>
                  <h3 className="font-bold text-lg">{panel.title}</h3>
                  <p className="mt-2">{panel.content}</p>
                </>
              ) : (
                <p className="text-lg">{panel.text}</p>
              )}

              {/* CHOICES */}
              {panel.type === "choice" && (
                <div className="mt-4 space-y-2">
                  {panel.choices.map((choice, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full"
                      disabled={choiceLocked}
                      onClick={() => {
                        setChoiceResult(choice.result);
                        setChoiceLocked(true);
                      }}
                    >
                      {choice.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* FEEDBACK */}
              {choiceResult && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="mt-4 bg-primary/10 p-3 rounded-xl text-sm"
                >
                  🌟 {choiceResult}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4 mt-8">
          {currentPanel > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPanel(p => p - 1);
                setChoiceResult(null);
                setChoiceLocked(false);
              }}
            >
              ⬅️ Back
            </Button>
          )}

          {currentPanel < story.panels.length - 1 ? (
            <Button
              disabled={panel.type === "choice" && !choiceLocked}
              onClick={() => {
                setCurrentPanel(p => p + 1);
                setChoiceResult(null);
                setChoiceLocked(false);
              }}
            >
              Next ➡️
            </Button>
          ) : (
            <Button onClick={() => setCurrentPanel(0)}>
              🔁 Read Again
            </Button>
          )}
        </div>

        {/* MORAL */}
        {currentPanel === story.panels.length - 1 && (
          <div className="bg-primary/10 p-6 rounded-2xl text-center mt-6">
            🌟 <strong>Comic Lesson</strong>
            <p className="mt-2 text-lg">{story.moral}</p>
          </div>
        )}

        <div className="text-center mt-6">
          <Link to="/resources">
            <Button>Back to Resources 🔙</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComicStory;
