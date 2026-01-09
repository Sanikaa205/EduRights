import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Aryan from "@/assets/aryan.png";
import correctSound from "@/assets/correct.mp3";

export default function LevelTwoSchoolRights() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const playCorrectSound = () => {
    const audio = new Audio(correctSound);
    audio.play();
  };

  const questions = [
    {
      text: "😟 Aryan sees a classmate being bullied at school.",
      question: "What should he do?",
      options: [
        { text: "Ignore it 😔", correct: false },
        { text: "Report to a teacher or counselor 🧑‍🏫", correct: true },
      ],
    },
    {
      text: "📚 Aryan is not allowed to attend class without reason.",
      question: "What is true?",
      options: [
        { text: "Education is every child’s right 🎓", correct: true },
        { text: "Teachers can deny education anytime ❌", correct: false },
      ],
    },
    {
      text: "🚫 Aryan is punished unfairly at school.",
      question: "What should he do?",
      options: [
        { text: "Tell a trusted adult or principal 🏫", correct: true },
        { text: "Accept it silently 😶", correct: false },
      ],
    },
    {
      text: "🧑‍🤝‍🧑 Aryan’s friend feels unsafe at school.",
      question: "How can Aryan help?",
      options: [
        { text: "Support and report the issue 💪", correct: true },
        { text: "Laugh and walk away 😔", correct: false },
      ],
    },
  ];

  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      playCorrectSound();

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswered(false);
        } else {
          completeLevel();
        }
      }, 1200);
    }
  };

  // ✅ Complete Level
  const completeLevel = async () => {
    localStorage.setItem("legalHeroLevel", "3");
    setCompleted(true);

    try {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/game/complete-level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          level: 2,
          badge: "🏫 School Hero",
        }),
      });
    } catch (err) {
      console.error("Failed to save Level 2:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          🏫 Level 2: School Rights
        </h1>

        <p className="text-center text-muted-foreground mb-6">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        {/* 👦 Character */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-4"
        >
          <img src={Aryan} alt="Aryan" className="w-40 h-40 object-contain" />
        </motion.div>

        <Card>
          <CardContent className="py-8">
            {!completed ? (
              <>
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
                  🏫 School Hero Badge Earned!
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
