import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import LevelUpAnimation from "./LevelUpAnimation";
import API_BASE_URL from "@/config/api";

import correctSound from "@/assets/correct.mp3";
import AnyaImg from "@/assets/anya.jpg";

export default function LevelFiveEquality() {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const playCorrectSound = () => {
    const audio = new Audio(correctSound);
    audio.play();
  };

  const scenarios = [
  {
    messages: [
      "👧 Aanya is new in school and speaks in a different accent.",
      "😕 Some kids say: “Don’t talk like that, it sounds funny.”",
    ],
    question: "What should Aanya do?",
    options: [
      { text: "Feel ashamed and stop speaking 😔", correct: false },
      { text: "Stay confident and tell a teacher if it continues 🧑‍🏫", correct: true },
    ],
  },
  {
    messages: [
      "🏫 In class, Aanya raises her hand many times.",
      "🙅 The teacher always ignores her but listens to others.",
    ],
    question: "What is the RIGHT step?",
    options: [
      { text: "Respectfully tell the teacher or counselor 🛡", correct: true },
      { text: "Stop participating forever 😶", correct: false },
    ],
  },
  {
    messages: [
      "🎮 During games, a group says: “Aanya can’t play, she is different.”",
      "😢 Aanya feels left out.",
    ],
    question: "What should happen in a fair school?",
    options: [
      { text: "Everyone should be included equally 🌈", correct: true },
      { text: "Only some kids should decide who plays 🚫", correct: false },
    ],
  },
  {
    messages: [
      "🧑‍🤝‍🧑 Aanya’s friend is teased because of their clothes and looks.",
      "💬 People start laughing and pointing.",
    ],
    question: "What is the best response?",
    options: [
      { text: "Support the friend and stop the bullying ✋", correct: true },
      { text: "Laugh with others to fit in 😬", correct: false },
    ],
  },
];


  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      playCorrectSound();

      setTimeout(() => {
        if (step < scenarios.length - 1) {
          setStep(step + 1);
          setAnswered(false);
        } else {
          completeLevel();
        }
      }, 1200);
    }
  };

  const completeLevel = async () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    // 🔥 Save badge in DB
    await fetch(`${API_BASE_URL}/api/badges/earn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        gameType: 'legalHero',
        levelId: 5,
        badge: '⚖ Equality Guardian',
      }),
    });

    // After Level 5 → unlock next
    localStorage.setItem("legalHeroLevel", "6");

    setCompleted(true);
    setShowLevelUp(true);

    setTimeout(() => setShowLevelUp(false), 2000);
  } catch (err) {
    console.error("❌ Failed to store equality badge:", err);
  }
};


  return (
    <>
      <Navbar />

      <LevelUpAnimation show={showLevelUp} badge="⚖ Equality Guardian" />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          ⚖ Level 5: Equality & Respect
        </h1>

        <p className="text-center text-muted-foreground mb-6">
          Scenario {step + 1} of {scenarios.length}
        </p>

        {/* Visual: Anya's image */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <img src={AnyaImg} alt="Aanya" className="w-48 h-auto rounded-lg shadow-lg" />
        </motion.div>

        <Card>
          <CardContent className="py-8">
            {!completed ? (
              <>
                {/* Messages */}
                <div className="space-y-3 mb-6">
                  {scenarios[step].messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="p-3 bg-muted rounded-lg"
                    >
                      {msg}
                    </motion.div>
                  ))}
                </div>

                <p className="font-semibold text-center mb-4">
                  {scenarios[step].question}
                </p>

                {!answered ? (
                  <div className="space-y-4">
                    {scenarios[step].options.map((opt, idx) => (
                      <motion.div key={idx} whileHover={{ scale: 1.05 }}>
                        <Button
                          className="w-full"
                          variant={opt.correct ? "default" : "destructive"}
                          onClick={() => handleAnswer(opt.correct)}
                        >
                          {opt.text}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center mt-4">
                    {correct ? (
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-600 text-xl font-semibold"
                      >
                        ✅ Correct decision!
                      </motion.p>
                    ) : (
                      <>
                        <motion.p
                          initial={{ x: -10 }}
                          animate={{ x: [-10, 10, -10, 0] }}
                          className="text-red-600 text-lg font-semibold mb-3"
                        >
                          ❌ Not fair!
                        </motion.p>
                        <Button onClick={() => setAnswered(false)}>
                          Try Again 🔄
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-700 text-2xl font-bold mb-4"
                >
                  🎉 Level Complete!
                </motion.p>

                <Badge className="text-lg px-4 py-2 mb-4">
                  ⚖ Equality Guardian
                </Badge>

                <div>
                  <Button
                    onClick={() =>
                      (window.location.href = "/games/legal-hero-journey")
                    }
                  >
                    Back to Map 🗺
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
}
