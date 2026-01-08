import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Aryan from "@/assets/aryan.png"; // 👦 character image

export default function LevelTwoSchoolRights() {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      unlockNextLevel();
      saveProgress();
    }
  };

  // ✅ Unlock Level 3
  const unlockNextLevel = () => {
    localStorage.setItem("legalHeroLevel", "3");
  };

  // ✅ Save to backend
  const saveProgress = async () => {
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
          Help Aryan make the right choice at school
        </p>

        {/* 👦 Character */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <img
            src={Aryan}
            alt="Aryan"
            className="w-40 h-40 object-contain"
          />
        </motion.div>

        <Card>
          <CardContent className="py-8">
            <p className="text-lg mb-6 text-center">
              😟 Aryan sees a classmate being bullied at school.
              <br />
              <strong>What should he do?</strong>
            </p>

            {!answered ? (
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => handleAnswer(false)}
                  >
                    Ignore it 😔
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    className="w-full"
                    onClick={() => handleAnswer(true)}
                  >
                    Report to a teacher or counselor 🧑‍🏫
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="text-center">
                {correct ? (
                  <>
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600 text-xl font-semibold mb-3"
                    >
                      ✅ Correct!
                    </motion.p>

                    <p className="mb-4">
                      Every child has the right to feel safe at school.
                    </p>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-4"
                    >
                      <Badge className="text-lg px-4 py-2">
                        🏫 School Hero Badge Earned!
                      </Badge>
                    </motion.div>

                    <Button
                      className="mt-4"
                      onClick={() =>
                        (window.location.href = "/games/legal-hero-journey")
                      }
                    >
                      Back to Map 🗺
                    </Button>
                  </>
                ) : (
                  <>
                    <motion.p
                      initial={{ x: -10 }}
                      animate={{ x: [-10, 10, -10, 0] }}
                      className="text-red-600 text-lg font-semibold mb-3"
                    >
                      ❌ Not quite!
                    </motion.p>

                    <p className="mb-4">
                      Bullying should always be reported to keep everyone safe.
                    </p>

                    <Button onClick={() => setAnswered(false)}>
                      Try Again 🔄
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
}
