import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LevelUpAnimation from "./LevelUpAnimation";

import { levels } from "@/data/levelsData"; // ✅ ADD THIS

import Riya from "@/assets/riya.png";
import correctSound from "@/assets/correct.mp3";

export default function LevelOneHomeRights() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // ✅ Get Level 1 data from levelsData.js
  const levelData = levels.find((lvl) => lvl.id === 1);

  const playCorrectSound = () => {
    const audio = new Audio(correctSound);
    audio.play();
  };

  const questions = [
    {
      text: "😢 Riya feels unsafe because someone is shouting at her.",
      question: "What should she do?",
      options: [
        { text: "Stay quiet and do nothing 😔", correct: false },
        { text: "Talk to a trusted adult or teacher 🧑‍🏫", correct: true },
      ],
    },
    {
      text: "🚪 Riya is locked alone in a room and feels scared.",
      question: "What is the right step?",
      options: [
        { text: "Tell someone she trusts immediately 📞", correct: true },
        { text: "Hide and stay silent 😶", correct: false },
      ],
    },
    {
      text: "🍽 Riya is not given enough food at home.",
      question: "What should she remember?",
      options: [
        { text: "Food is a child’s right 🍎", correct: true },
        { text: "She must accept it silently 😔", correct: false },
      ],
    },
    {
      text: "💔 Riya is being hurt at home.",
      question: "What is the BEST thing to do?",
      options: [
        { text: "Tell a teacher or helpline 🆘", correct: true },
        { text: "Keep it a secret 🤐", correct: false },
      ],
    },
  ];

  // ✅ UPDATED HANDLE ANSWER
  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      playCorrectSound();

      setTimeout(async () => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setAnswered(false);
        } else {
          // 🎯 LEVEL COMPLETED
          localStorage.setItem("legalHeroLevel", "2");
          setShowLevelUp(true);

          // ✅ SAVE BADGE TO DB
          const user = JSON.parse(localStorage.getItem("user"));

          if (user?.id) {
            try {
              await fetch("http://localhost:5000/api/badges/earn", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: user.id,
                  gameType: "legalHero",
                  levelId: 1,
                  badge: levelData.badge,
                }),
              });
            } catch (error) {
              console.error("Failed to save badge:", error);
            }
          }
        }
      }, 1200);
    }
  };

  return (
    <>
      <Navbar />

      {/* ✅ BADGE FROM levelsData */}
      <LevelUpAnimation show={showLevelUp} badge={levelData.badge} />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          🏠 Level 1: {levelData.title}
        </h1>

        <p className="text-center text-muted-foreground mb-6">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        {/* 👧 Character */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-4"
        >
          <img src={Riya} alt="Riya" className="w-40 h-40 object-contain" />
        </motion.div>

        <Card>
          <CardContent className="py-8">
            <p className="text-lg mb-2 text-center">
              {questions[currentQuestion].text}
            </p>
            <p className="font-semibold text-center mb-6">
              {questions[currentQuestion].question}
            </p>

            {!answered ? (
              <div className="space-y-4">
                {questions[currentQuestion].options.map((opt, idx) => (
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
                    ✅ Great choice!
                  </motion.p>
                ) : (
                  <>
                    <motion.p
                      initial={{ x: -10 }}
                      animate={{ x: [-10, 10, -10, 0] }}
                      className="text-red-600 text-lg font-semibold mb-3"
                    >
                      ❌ Try again!
                    </motion.p>
                    <Button onClick={() => setAnswered(false)}>
                      Try Again 🔄
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {showLevelUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center animate-bounceIn">
              <h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
              <p className="text-lg mb-4">
                You completed Level 1: {levelData.title}
              </p>
              <Badge className="text-lg px-4 py-2 mb-4 block mx-auto">
                {levelData.badge} Badge Earned!
              </Badge>
              <Button
                className="mt-2 w-full bg-yellow-400 text-black hover:bg-yellow-500"
                onClick={() =>
                  (window.location.href = "/games/legal-hero-journey")
                }
              >
                🗺 Back to Map
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
