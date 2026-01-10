import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import questions from "./module3QuizQuestions";

export default function Module3Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (idx) => setSelected(idx);

  const handleNext = () => {
    if (selected === questions[current].answer) setScore(score + 1);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      // Set progress to 100% in localStorage
      localStorage.setItem("module-3-progress", "100");
    }
  };

  const handleFinish = () => {
    navigate("/modules");
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fdf6ec]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
            <p className="text-xl mb-6">Your score: <span className="font-bold">{score} / {questions.length}</span></p>
            <Button size="lg" onClick={handleFinish}>
              Back to Modules
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf6ec]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Question {current + 1} of {questions.length}</h2>
          <p className="text-lg mb-6">{q.question}</p>
          <div className="space-y-3 mb-6">
            {q.options.map((opt, idx) => (
              <Button
                key={idx}
                variant={selected === idx ? "default" : "outline"}
                className="w-full text-left"
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                {opt}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={selected === null}
            className="w-full"
          >
            {current === questions.length - 1 ? "Finish Quiz" : "Next"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
