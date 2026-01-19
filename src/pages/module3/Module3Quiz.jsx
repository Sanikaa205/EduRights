
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import questions from "./module3QuizQuestions";

const API_BASE_URL = "http://localhost:5000/api";

const saveProgressToAPI = async (moduleKey, progress) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) return;

    await fetch(`${API_BASE_URL}/learn/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        moduleKey,
        progress,
      }),
    });

    window.dispatchEvent(new Event("learnProgressUpdated"));
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

const submitQuizScoreToAPI = async (moduleId, score) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) return;

    await fetch(`${API_BASE_URL}/points/submit/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleId,
        score,
      }),
    });
  } catch (error) {
    console.error("Error submitting quiz score:", error);
  }
};

export default function Module3Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
      saveProgressToAPI("module-3-progress", 100);
      submitQuizScoreToAPI("module-3", score);
    }
  };

  const handleFinish = () => {
    navigate("/modules");
  };

  const keyLearnings = [
    "Play is a fundamental right that helps children grow and develop.",
    "Children need safe spaces where they can play freely and have fun.",
    "Playing together teaches teamwork, friendship, and important life skills.",
    "Every child deserves time to play, rest, and enjoy their childhood.",
  ];

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-200 via-purple-200 to-pink-200 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-[15%] text-6xl float-animation stagger-1 animate-bounce">⭐</div>
          <div className="absolute top-40 right-[20%] text-5xl float-slow stagger-2">🌟</div>
          <div className="absolute bottom-32 left-[10%] text-4xl float-animation stagger-3 animate-pulse">✨</div>
          <div className="absolute top-60 left-[5%] text-5xl float-slow stagger-4 animate-bounce">🎈</div>
          <div className="absolute bottom-48 right-[15%] text-6xl float-animation stagger-5">🎯</div>
          <div className="absolute top-32 right-[10%] text-5xl spin-slow">🌈</div>
          <div className="absolute top-1/3 left-1/4 text-6xl float-animation stagger-2">🎉</div>
          <div className="absolute bottom-1/4 right-1/3 text-5xl float-slow stagger-4">🎊</div>
        </div>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border-8 border-yellow-400 animate__animated animate__fadeIn flex flex-col items-center relative">
            <div className="mb-4 animate__animated animate__bounceIn">
              <span className="text-8xl drop-shadow-lg">🦉</span>
            </div>
            <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">🎉 Quiz Complete!</h2>

            <div className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl p-8 mb-8 w-full shadow-xl border-4 border-blue-500">
              <p className="text-white text-sm font-bold mb-2 uppercase tracking-widest">Your Score</p>
              <p className="text-white text-7xl font-black drop-shadow-md">{score}/{questions.length}</p>
              <p className="text-white text-2xl font-bold mt-3 drop-shadow-md">{percentage}%</p>
            </div>

            {percentage === 100 && <p className="text-yellow-500 text-3xl font-black mb-6 drop-shadow-lg">🏆 Perfect Score!</p>}
            {percentage >= 80 && percentage < 100 && <p className="text-green-600 text-3xl font-black mb-6 drop-shadow-lg">⭐ Excellent Work!</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-blue-600 text-3xl font-black mb-6 drop-shadow-lg">👍 Good Job!</p>}
            {percentage < 60 && <p className="text-orange-600 text-3xl font-black mb-6 drop-shadow-lg">💪 Keep Practicing!</p>}

            <Button
              onClick={handleFinish}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black shadow-xl rounded-full text-lg py-4 px-10 hover:scale-110 transition-transform w-full border-4 border-pink-600 uppercase tracking-wider"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-200 via-purple-200 to-pink-200 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-[15%] text-6xl float-animation stagger-1 animate-bounce">⭐</div>
        <div className="absolute top-40 right-[20%] text-5xl float-slow stagger-2">🌟</div>
        <div className="absolute bottom-32 left-[10%] text-4xl float-animation stagger-3 animate-pulse">✨</div>
        <div className="absolute top-60 left-[5%] text-5xl float-slow stagger-4 animate-bounce">🎈</div>
        <div className="absolute bottom-48 right-[15%] text-6xl float-animation stagger-5">🎯</div>
        <div className="absolute top-32 right-[10%] text-5xl spin-slow">🌈</div>
      </div>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full border-8 border-blue-400 animate__animated animate__fadeIn">
          {/* Progress bar */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-black text-blue-700 uppercase tracking-wider">Progress {current + 1}/{questions.length}</span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white shadow-lg border-2 border-yellow-500 uppercase">
                <span className="text-xl">⭐</span>
                <span>Score: {score}</span>
              </span>
            </div>
            <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
              <div
                className="h-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mascot */}
          <div className="flex justify-center mb-6 animate__animated animate__bounceIn">
            <span className="text-7xl drop-shadow-lg">🦉</span>
          </div>

          {/* Question */}
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3 text-center">Question {current + 1} of {questions.length}</h2>
          <p className="text-lg mb-8 text-gray-800 font-bold text-center leading-relaxed bg-blue-50 p-4 rounded-2xl border-4 border-blue-300">{q.question}</p>

          {/* Options */}
          <div className="space-y-3 mb-6 w-full">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full text-left px-6 py-4 text-base font-bold transition-all duration-300 rounded-2xl border-4 flex items-center gap-3 cursor-pointer shadow-lg
                  ${selected === idx
                    ? isCorrect
                      ? "bg-gradient-to-r from-green-400 to-emerald-400 border-green-600 scale-105 text-white shadow-2xl"
                      : "bg-gradient-to-r from-red-400 to-pink-400 border-red-600 scale-105 text-white shadow-2xl animate-pulse"
                    : idx === questions[current].answer && showFeedback && !isCorrect
                      ? "bg-gradient-to-r from-green-400 to-emerald-400 border-green-600 text-white shadow-2xl"
                      : "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-400 text-gray-800 hover:bg-gradient-to-br hover:from-blue-200 hover:to-purple-200 hover:border-blue-500 hover:scale-105 hover:shadow-2xl"
                  }
                  ${answered ? "opacity-80" : ""}`}
              >
                <span className={`font-black text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2
                  ${selected === idx ? "bg-white text-blue-600 border-white" : "bg-gradient-to-r from-blue-400 to-purple-400 text-white border-blue-600"}`}>
                  {optionLetters[idx]}
                </span>
                <span className="flex-1 text-left">{opt}</span>
                {selected === idx && isCorrect && <span className="text-3xl">✓</span>}
                {selected === idx && !isCorrect && <span className="text-3xl">✗</span>}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="mb-6 text-center animate__animated animate__fadeIn">
              {isCorrect ? (
                <div className="text-white text-lg font-black bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg border-4 border-green-600">
                  <span>🎉 Great job! That's correct! 🎉</span>
                </div>
              ) : (
                <div className="text-white text-lg font-black bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-2xl shadow-lg border-4 border-red-600">
                  <span>❌ Oops! The correct answer is {optionLetters[questions[current].answer]}.</span>
                </div>
              )}
            </div>
          )}

          {/* Button */}
          {answered && (
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-black shadow-xl rounded-full text-lg py-4 px-8 hover:scale-110 transition-transform border-4 border-yellow-500 uppercase tracking-wider"
            >
              {current === questions.length - 1 ? "Finish Quiz 🏁" : "Next Question →"}
            </Button>
          )}
          {!answered && (
            <div className="text-center text-gray-600 text-base font-black py-4 bg-yellow-100 rounded-2xl border-4 border-yellow-300">
              👆 Select an answer to continue
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
