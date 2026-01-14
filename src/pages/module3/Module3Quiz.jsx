
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
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (idx) => {
    setSelected(idx);
    setIsCorrect(idx === questions[current].answer);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isCorrect) setScore(score + 1);
    setSelected(null);
    setShowFeedback(false);
    setIsCorrect(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      // Set progress to 100% in localStorage
      localStorage.setItem("module-3-progress", "100");
    }
  };

  const handleTryAgain = () => {
    setSelected(null);
    setShowFeedback(false);
    setIsCorrect(null);
  };

  const handleFinish = () => {
    navigate("/modules");
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 relative overflow-hidden">
        {/* Floating emoji and wave decorations for website vibe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-[15%] text-5xl float-animation stagger-1">⭐</div>
          <div className="absolute top-40 right-[20%] text-4xl float-slow stagger-2">🌟</div>
          <div className="absolute bottom-32 left-[10%] text-3xl float-animation stagger-3">✨</div>
          <div className="absolute top-60 left-[5%] text-4xl float-slow stagger-4">🎈</div>
          <div className="absolute bottom-48 right-[15%] text-5xl float-animation stagger-5">🎯</div>
          <div className="absolute top-32 right-[10%] text-3xl spin-slow">🌈</div>
        </div>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-4 border-yellow-300 animate__animated animate__fadeIn flex flex-col items-center relative">
            {/* Mascot/character */}
            <div className="mb-2 animate__animated animate__bounceIn">
              <span className="text-6xl">🦉</span>
            </div>
            <h2 className="text-4xl font-extrabold mb-4 text-pink-600">🎉 Quiz Complete!</h2>
            <p className="text-2xl mb-6 text-blue-700">Your score: <span className="font-bold text-green-600">{score} / {questions.length}</span></p>
            <Button size="lg" onClick={handleFinish} className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold shadow-lg rounded-full text-xl py-3 px-8 hover:scale-105 transition-transform">
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 relative overflow-hidden">
      {/* Floating emoji and wave decorations for website vibe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-[15%] text-5xl float-animation stagger-1">⭐</div>
        <div className="absolute top-40 right-[20%] text-4xl float-slow stagger-2">🌟</div>
        <div className="absolute bottom-32 left-[10%] text-3xl float-animation stagger-3">✨</div>
        <div className="absolute top-60 left-[5%] text-4xl float-slow stagger-4">🎈</div>
        <div className="absolute bottom-48 right-[15%] text-5xl float-animation stagger-5">🎯</div>
        <div className="absolute top-32 right-[10%] text-3xl spin-slow">🌈</div>
      </div>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border-4 border-blue-200 animate__animated animate__fadeIn flex flex-col items-center relative">
          {/* Mascot/character */}
          <div className="mb-2 animate__animated animate__bounceIn">
            <span className="text-6xl">🦉</span>
          </div>
          {/* Progress bar */}
          <div className="w-full mb-4">
            <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-700 mt-1 text-right font-bold">Progress: {current + 1} / {questions.length}</div>
          </div>
          <div className="flex justify-between items-center mb-4 w-full">
            <h2 className="text-2xl font-bold text-blue-700">Question {current + 1} of {questions.length}</h2>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r from-green-400 via-blue-300 to-yellow-300 text-white animate__animated animate__pulse">
              <span className="text-2xl">⭐</span>
              <span>Score: {score}</span>
            </span>
          </div>
          <p className="text-lg mb-6 text-pink-700 font-semibold">{q.question}</p>
          <div className="space-y-3 mb-6 w-full">
            {q.options.map((opt, idx) => (
              <Button
                key={idx}
                variant={selected === idx ? (isCorrect === true ? "success" : "destructive") : "outline"}
                className={`w-full text-left text-lg font-medium transition-all duration-300 rounded-full border-2 ${selected === idx ? (isCorrect === true ? "bg-green-100 border-green-400 scale-105" : "bg-red-100 border-red-400 scale-105 animate__animated animate__headShake") : "hover:scale-105 hover:bg-blue-50"}`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                <span className="inline-block mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
              </Button>
            ))}
          </div>
          {showFeedback && (
            <div className="mb-4 text-center animate__animated animate__fadeIn">
              {isCorrect ? (
                <div className="text-green-600 text-xl font-bold flex flex-col items-center gap-2">
                  <span>🎉 Great job! That's correct!</span>
                  <span className="animate-bounce text-3xl">👏</span>
                  <span className="text-4xl animate__animated animate__tada">🥳</span>
                </div>
              ) : (
                <div className="text-red-600 text-xl font-bold flex flex-col items-center gap-2">
                  <span>❌ Oops! Try again!</span>
                  <span className="animate-shake text-3xl">🔄</span>
                  <span className="text-4xl animate__animated animate__wobble">😅</span>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2 w-full">
            {showFeedback && isCorrect && (
              <Button
                onClick={handleNext}
                className="w-full bg-green-400 text-white font-bold shadow-md rounded-full text-xl py-3 px-8 hover:scale-105 transition-transform"
              >
                {current === questions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            )}
            {showFeedback && isCorrect === false && (
              <Button
                onClick={handleTryAgain}
                className="w-full bg-red-400 text-white font-bold shadow-md rounded-full text-xl py-3 px-8 hover:scale-105 transition-transform"
              >
                Try Again
              </Button>
            )}
            {!showFeedback && (
              <Button
                onClick={() => {}}
                disabled={selected === null}
                className="w-full bg-yellow-300 text-white font-bold shadow-md rounded-full text-xl py-3 px-8"
                style={{ display: "none" }}
              >
                {current === questions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
