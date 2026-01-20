import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import LevelUpAnimation from "./LevelUpAnimation";
import API_BASE_URL from "@/config/api";

import WorkplaceImg from "@/assets/workplace.png";
import correctSound from "@/assets/correct.mp3";

export default function LevelFourWorkplace() {
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
        "👩 Sara is asked to work extra hours.",
        "💬 Boss: There’s no extra pay for this work.",
      ],
      question: "What should Sara do?",
      options: [
        { text: "Accept silently 😔", correct: false },
        { text: "Speak up or report unfair work 🛡", correct: true },
      ],
    },
    {
      messages: [
        "🧑‍🏭 Sara is asked to do dangerous work.",
        "⚠️ No safety equipment is provided.",
      ],
      question: "What is the safest choice?",
      options: [
        { text: "Refuse and inform authorities 🧤", correct: true },
        { text: "Do it anyway 😬", correct: false },
      ],
    },
    {
      messages: [
        "📅 Sara is not allowed to take any breaks.",
      ],
      question: "What should she know?",
      options: [
        { text: "Breaks are a worker’s right ⏸", correct: true },
        { text: "Breaks are not allowed ❌", correct: false },
      ],
    },
    {
      messages: [
        "💬 Sara is threatened for asking about her salary.",
      ],
      question: "What should Sara do?",
      options: [
        { text: "Stay silent 😟", correct: false },
        { text: "Seek help from labor authorities ⚖️", correct: true },
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
        levelId: 4,
        badge: '🏢 Workplace Hero',
      }),
    });

    localStorage.setItem("legalHeroLevel", "5");
    setCompleted(true);
    setShowLevelUp(true);

    setTimeout(() => setShowLevelUp(false), 2000);
  } catch (err) {
    console.error("❌ Failed to store workplace badge:", err);
  }
};


  return (
    <>
      <Navbar />

      <LevelUpAnimation show={showLevelUp} badge="🏢 Workplace Hero" />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          🏢 Level 4: Workplace Protection
        </h1>

        <p className="text-center text-muted-foreground mb-6">
          Scenario {step + 1} of {scenarios.length}
        </p>

        {/* Visual */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <img src={WorkplaceImg} alt="Workplace" className="w-64 h-auto" />
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
                          ❌ Not safe!
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
                  🏢 Workplace Hero
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
