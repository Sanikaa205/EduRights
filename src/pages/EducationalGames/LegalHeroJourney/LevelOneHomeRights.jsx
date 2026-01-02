import { motion } from "framer-motion";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LevelOneHomeRights() {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);
if (isCorrect) {
    localStorage.setItem("legalHeroLevel", "2"); // unlock next level
  
  }
  };
  const unlockNextLevel = () => {
  localStorage.setItem("legalHeroLevel", "2");
};

   

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          🏠 Level 1: Home Rights
        </h1>

        <p className="text-center text-muted-foreground mb-8">
          Help the child choose the right action.
        </p>

        <Card>
          <CardContent className="py-8">
            <p className="text-lg mb-6">
              👧 Riya feels unsafe at home because someone is shouting at her.
              What should she do?
            </p>

            {!answered ? (
              <div className="space-y-4">
                <Button
                  className="w-full"
                  onClick={() => handleAnswer(false)}
                >
                  Stay quiet and do nothing 😔
                </Button>

                <Button
                  className="w-full"
                  onClick={() => handleAnswer(true)}
                >
                  Talk to a trusted adult or teacher 🧑‍🏫
                </Button>
              </div>
            ) : (
              <div className="text-center">
                {correct ? (
                  <>
                  
                    <p className="text-green-600 text-lg font-semibold mb-4">
                      ✅ Correct!
                    </p>
                    <p className="mb-4">
                      Every child has the right to safety and care at home.
                    </p>
                    <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 300 }}
><Badge className="text-lg px-4 py-2">
                      ⭐ Home Hero Badge Earned!
                    </Badge>
  
</motion.div>
                    

                    <div className="mt-6">
                      <Button
                        onClick={() =>
                          (window.location.href =
                            "/games/legal-hero-journey")
                        }
                      >
                        Back to Map 🗺
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-red-600 text-lg font-semibold mb-4">
                      ❌ Not quite.
                    </p>
                    <p className="mb-4">
                      Children should always tell a trusted adult when they feel unsafe.
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
