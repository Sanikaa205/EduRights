import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import questions from "./module5QuizQuestions";

export default function Module5Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    const correctAnswer = idx === questions[current].answer;
    setIsCorrect(correctAnswer);
    setShowFeedback(true);
    setAnswered(true);
    if (correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setAnswered(false);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      localStorage.setItem("module-5-progress", "100");
    }
  };

  const handleFinish = () => {
    navigate("/modules");
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 relative overflow-hidden">
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
            <div className="mb-2 animate__animated animate__bounceIn">
              <span className="text-6xl">🦉</span>
            </div>
            <h2 className="text-4xl font-extrabold mb-4 text-pink-600">🎉 Quiz Complete!</h2>

            <div className="bg-gradient-to-r from-blue-300 to-purple-300 rounded-3xl p-6 mb-6 w-full">
              <p className="text-white text-sm font-semibold mb-1">Your Score</p>
              <p className="text-white text-5xl font-extrabold">{score}/{questions.length}</p>
              <p className="text-white text-lg mt-2">{percentage}%</p>
            </div>

            {percentage === 100 && <p className="text-green-600 text-2xl font-bold mb-4">🏆 Perfect Score!</p>}
            {percentage >= 80 && percentage < 100 && <p className="text-green-600 text-2xl font-bold mb-4">⭐ Excellent Work!</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-blue-600 text-2xl font-bold mb-4">👍 Good Job!</p>}
            {percentage < 60 && <p className="text-orange-600 text-2xl font-bold mb-4">💪 Keep Practicing!</p>}

            <Button
              onClick={handleFinish}
              className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold shadow-lg rounded-full text-lg py-3 px-8 hover:scale-105 transition-transform w-full"
            >
              Back to Modules
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const q = questions[current];
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-[15%] text-5xl float-animation stagger-1">⭐</div>
        <div className="absolute top-40 right-[20%] text-4xl float-slow stagger-2">🌟</div>
        <div className="absolute bottom-32 left-[10%] text-3xl float-animation stagger-3">✨</div>
        <div className="absolute top-60 left-[5%] text-4xl float-slow stagger-4">🎈</div>
        <div className="absolute bottom-48 right-[15%] text-5xl float-animation stagger-5">🎯</div>
        <div className="absolute top-32 right-[10%] text-3xl spin-slow">🌈</div>
      </div>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full border-4 border-blue-200 animate__animated animate__fadeIn">
          {/* Progress bar */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-blue-700">Progress {current + 1}/{questions.length}</span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-green-400 via-blue-300 to-yellow-300 text-white">
                <span>⭐ Score: {score}</span>
              </span>
            </div>
            <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mascot */}
          <div className="flex justify-center mb-4 animate__animated animate__bounceIn">
            <span className="text-5xl">🦉</span>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Question {current + 1} of {questions.length}</h2>
          <p className="text-lg mb-6 text-gray-800 font-semibold text-center leading-relaxed">{q.question}</p>

          {/* Options */}
          <div className="space-y-3 mb-6 w-full">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full text-left px-5 py-4 text-base font-medium transition-all duration-300 rounded-2xl border-2 flex items-center gap-3 cursor-pointer
                  ${selected === idx
                    ? isCorrect
                      ? "bg-green-100 border-green-500 scale-105 text-green-800 shadow-lg"
                      : "bg-red-100 border-red-500 scale-105 text-red-800 shadow-lg animate-pulse"
                    : idx === questions[current].answer && showFeedback && !isCorrect
                      ? "bg-green-100 border-green-500 text-green-800 shadow-lg"
                      : "bg-white border-blue-300 text-gray-800 hover:bg-blue-50 hover:border-blue-400 hover:scale-105"
                  }
                  ${answered ? "opacity-75" : ""}`}
              >
                <span className={`font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center
                  ${selected === idx ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-600"}`}>
                  {optionLetters[idx]}
                </span>
                <span className="flex-1">{opt}</span>
                {selected === idx && isCorrect && <span className="text-2xl">✓</span>}
                {selected === idx && !isCorrect && <span className="text-2xl">✗</span>}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="mb-6 text-center animate__animated animate__fadeIn">
              {isCorrect ? (
                <div className="text-green-600 text-lg font-bold">
                  <span>🎉 Great job! That's correct!</span>
                </div>
              ) : (
                <div className="text-red-600 text-lg font-bold">
                  <span>❌ Oops! The correct answer is {optionLetters[questions[current].answer]}.</span>
                </div>
              )}
            </div>
          )}

          {/* Button */}
          {answered && (
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white font-bold shadow-md rounded-full text-lg py-3 px-8 hover:scale-105 transition-transform"
            >
              {current === questions.length - 1 ? "Finish Quiz" : "Next Question →"}
            </Button>
          )}
          {!answered && (
            <div className="text-center text-gray-500 text-sm font-medium py-3">
              Select an answer to continue
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
