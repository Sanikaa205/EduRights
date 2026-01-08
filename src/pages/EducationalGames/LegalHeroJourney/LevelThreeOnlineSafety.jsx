import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import LevelUpAnimation from "./LevelUpAnimation";
import AlexPhone from "@/assets/alex.png"; // phone/comic image

export default function LevelThreeOnlineSafety() {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // simulate chat messages
  const messages = [
    "👤 Stranger: Hey Alex, can you give me your address?",
    "👤 Stranger: And your school info too?",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  const handleNextMessage = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    }
  };

  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      localStorage.setItem("legalHeroLevel", "4");
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          💻 Level 3: Online Safety (Interactive)
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Help Alex respond safely online!
        </p>

        {/* Comic / Phone Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <img src={AlexPhone} alt="Alex on phone" className="w-64 h-auto" />
        </motion.div>

        <Card>
          <CardContent className="py-8">
            {/* Display current message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 p-4 bg-gray-100 rounded-lg text-left"
            >
              {messages[currentMessage]}
            </motion.div>

            {/* Next / answer choices */}
            {!answered ? (
              <>
                {currentMessage < messages.length - 1 ? (
                  <div className="text-center">
                    <Button onClick={handleNextMessage}>Next Message ➡️</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => handleAnswer(false)}
                      >
                        Share the info 😬
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        className="w-full"
                        onClick={() => handleAnswer(true)}
                      >
                        Tell a trusted adult and block the stranger 🛡
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
                      Alex stayed safe online! 🎉 Protecting personal info is crucial.
                    </p>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-4"
                    >
                      <Badge className="text-lg px-4 py-2">
                        💻 Online Safety Hero
                      </Badge>
                    </motion.div>

                    {showLevelUp && (
                      <LevelUpAnimation
                        show={showLevelUp}
                        badge="💻 Online Safety Hero"
                      />
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
                      Always tell a trusted adult and block strangers online.
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
