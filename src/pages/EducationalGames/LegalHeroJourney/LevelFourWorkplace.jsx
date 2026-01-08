import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import LevelUpAnimation from "./LevelUpAnimation";
import WorkplaceImg from "@/assets/workplace.png"; // Add an office/workplace image

export default function LevelFourWorkplace() {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "👩 Sara is asked to work extra hours without pay.",
    "💬 Her boss says it's mandatory and there’s no extra pay.",
  ];

  const handleNextMessage = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    }
  };

  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      localStorage.setItem("legalHeroLevel", "5"); // mark complete
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          🏢 Level 4: Workplace Protection (Interactive)
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Help Sara understand her rights at work!
        </p>

        {/* Workplace visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <img src={WorkplaceImg} alt="Sara at workplace" className="w-64 h-auto" />
        </motion.div>

        <Card>
          <CardContent className="py-8">
            {/* Show chat messages */}
            {!answered && currentMessage <= messages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 p-4 bg-gray-100 rounded-lg text-left"
              >
                {messages[currentMessage]}
              </motion.div>
            )}

            {!answered ? (
              <>
                {currentMessage < messages.length - 1 ? (
                  <div className="text-center">
                    <Button onClick={handleNextMessage}>Next ➡️</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => handleAnswer(false)}
                      >
                        Keep working without complaining 😬
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        className="w-full"
                        onClick={() => handleAnswer(true)}
                      >
                        Talk to a trusted adult or report 🛡
                      </Button>
                    </motion.div>
                  </div>
                )}
              </>
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
                      Every worker has the right to fair treatment and proper compensation.
                    </p>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-4"
                    >
                      <Badge className="text-lg px-4 py-2">
                        🏢 Workplace Hero
                      </Badge>
                    </motion.div>

                    {showLevelUp && (
                      <LevelUpAnimation show={showLevelUp} badge="🏢 Workplace Hero" />
                    )}

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
                      Workers should always know their rights and ask for help if treated unfairly.
                    </p>
                    <Button onClick={() => setAnswered(false)}>Try Again 🔄</Button>
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
