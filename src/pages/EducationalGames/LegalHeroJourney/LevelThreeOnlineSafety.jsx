import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import LevelUpAnimation from "./LevelUpAnimation";

import AlexPhone from "@/assets/alex.png";
import correctSound from "@/assets/correct.mp3";

export default function LevelThreeOnlineSafety() {
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
        "👤 Stranger: Hey Alex, can you give me your address?",
        "👤 Stranger: And your school info too?",
      ],
      question: "What should Alex do?",
      options: [
        { text: "Share the info 😬", correct: false },
        { text: "Tell a trusted adult and block 🛡", correct: true },
      ],
    },
    {
      messages: [
        "📩 Unknown User: You won a free phone!",
        "📩 Click this link to claim it 🎁",
      ],
      question: "What is the safest action?",
      options: [
        { text: "Click the link 🖱", correct: false },
        { text: "Ignore and report 🚨", correct: true },
      ],
    },
    {
      messages: [
        "👤 Online Friend: Send me your photo 📸",
        "👤 Don’t tell anyone 🤫",
      ],
      question: "What should Alex do?",
      options: [
        { text: "Say no and tell an adult 👨‍👩‍👧", correct: true },
        { text: "Send the photo 😟", correct: false },
      ],
    },
    {
      messages: [
        "💬 Group Chat: Mean messages about Alex",
      ],
      question: "How should Alex respond?",
      options: [
        { text: "Block and report bullying 🚫", correct: true },
        { text: "Reply angrily 😡", correct: false },
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
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return;

  const user = JSON.parse(storedUser);

  try {
    await fetch("http://localhost:5000/api/badges/earn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        gameType: 'legalHero',
        levelId: 3,
        badge: "💻 Online Safety Hero",
      }),
    });

    localStorage.setItem("legalHeroLevel", "4");

    setCompleted(true);
    setShowLevelUp(true);

    setTimeout(() => setShowLevelUp(false), 2000);
  } catch (err) {
    console.error("Badge save failed", err);
  }
};

  return (
    <>
      <Navbar />

      <LevelUpAnimation show={showLevelUp} badge="💻 Online Safety Hero" />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          💻 Level 3: Online Safety
        </h1>

        <p className="text-center text-muted-foreground mb-6">
          Scenario {step + 1} of {scenarios.length}
        </p>

        {/* Phone Visual */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <img src={AlexPhone} alt="Alex Phone" className="w-64 h-auto" />
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
                        ✅ Safe choice!
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
                  💻 Online Safety Hero
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
