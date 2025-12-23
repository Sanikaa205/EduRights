import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/ui/ProgressBar";
import { ArrowRight, RotateCcw, Trophy, CheckCircle, XCircle, Star, Sparkles } from "lucide-react";

const Quiz = () => {
  const questions = [
    {
      question: "Every child has the right to go to...",
      options: ["The movies every day", "School and get education", "Buy whatever they want", "Stay up late"],
      correct: 1,
      explanation: "Education is one of your most important rights! Every child deserves to learn.",
    },
    {
      question: "Who should listen to children's opinions?",
      options: ["Nobody", "Only their friends", "Adults and decision-makers", "Only teachers"],
      correct: 2,
      explanation: "Your voice matters! Adults should listen to your thoughts and ideas.",
    },
    {
      question: "What does 'equality' mean for children?",
      options: ["Everyone gets the same toys", "All children should be treated fairly", "Only some children have rights", "Nothing important"],
      correct: 1,
      explanation: "Equality means every child deserves fair treatment, no matter who they are!",
    },
    {
      question: "Children have the right to feel...",
      options: ["Scared all the time", "Safe and protected", "Ignored by adults", "Alone always"],
      correct: 1,
      explanation: "You deserve to feel safe at home, school, and everywhere you go!",
    },
    {
      question: "Why is play important for children?",
      options: ["It's not important", "It helps you grow and learn", "Only for babies", "Adults don't understand"],
      correct: 1,
      explanation: "Playing is how you learn, grow, and stay happy! It's your right to have fun.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, isCorrect]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: "🏆", text: "PERFECT! You're a Rights Champion!", color: "gradient-card-yellow" };
    if (percentage >= 80) return { emoji: "🌟", text: "Amazing! You know your rights well!", color: "gradient-card-purple" };
    if (percentage >= 60) return { emoji: "👍", text: "Great job! Keep learning!", color: "gradient-card-blue" };
    if (percentage >= 40) return { emoji: "💪", text: "Good try! Practice makes perfect!", color: "gradient-card-green" };
    return { emoji: "📚", text: "Keep learning! You'll get better!", color: "gradient-card-orange" };
  };

  const optionLetters = ["A", "B", "C", "D"];
  const optionColors = [
    { bg: "hover:bg-primary/10 hover:border-primary", active: "bg-primary border-primary" },
    { bg: "hover:bg-success/10 hover:border-success", active: "bg-success border-success" },
    { bg: "hover:bg-secondary/10 hover:border-secondary", active: "bg-secondary border-secondary" },
    { bg: "hover:bg-accent/10 hover:border-accent", active: "bg-accent border-accent" },
  ];

  if (quizComplete) {
    const result = getResultMessage();
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
          {/* Celebration decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-[10%] text-4xl float-animation">🎉</div>
            <div className="absolute top-32 right-[15%] text-5xl float-slow stagger-2">⭐</div>
            <div className="absolute bottom-32 left-[20%] text-4xl float-animation stagger-3">🎊</div>
            <div className="absolute bottom-20 right-[10%] text-5xl float-slow stagger-4">✨</div>
            <div className="absolute top-1/2 left-[5%] text-3xl float-animation stagger-5">🌟</div>
          </div>

          <div className="max-w-md w-full text-center">
            <div className="card-cartoon animate-bounce-in border-4 border-secondary/30">
              <div className="text-8xl mb-6 bounce-animation">{result.emoji}</div>
              <h1 className="font-display font-bold text-4xl text-foreground mb-3">
                Quiz Complete!
              </h1>
              <p className="font-body font-semibold text-muted-foreground text-xl mb-6">
                {result.text}
              </p>

              <div className={`${result.color} rounded-3xl p-6 mb-6 shadow-[0_8px_0_hsl(200_50%_40%)]`}>
                <p className="font-body font-semibold text-primary-foreground/80 text-sm mb-1">
                  Your Score
                </p>
                <p className="font-display font-bold text-6xl text-primary-foreground drop-shadow-md">
                  {score} / {questions.length}
                </p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Star className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                  <span className="font-body font-bold text-primary-foreground">
                    +{score * 50} points earned!
                  </span>
                </div>
              </div>

              {/* Answer Summary */}
              <div className="flex justify-center gap-3 mb-6">
                {answers.map((correct, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg shadow-[0_4px_0] ${
                      correct 
                        ? "bg-success text-success-foreground shadow-[0_4px_0_hsl(var(--success-depth))]" 
                        : "bg-destructive text-destructive-foreground shadow-[0_4px_0_hsl(0_70%_45%)]"
                    }`}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="hero" size="lg" className="gap-2" onClick={resetQuiz}>
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </Button>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <Trophy className="w-5 h-5" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-[10%] text-3xl float-slow opacity-60">💭</div>
        <div className="absolute bottom-32 left-[5%] text-4xl float-animation opacity-60">🎯</div>

        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-body font-semibold text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-xl">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-display font-bold text-secondary-foreground">
                  {score} Points
                </span>
              </div>
            </div>
            <ProgressBar
              value={(currentQuestion + 1)}
              max={questions.length}
              showLabel={false}
              variant="rainbow"
              size="md"
            />
          </div>

          {/* Question Card */}
          <div className="card-cartoon mb-6 border-4 border-primary/30">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 bounce-animation">🤔</div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                let optionStyle = "";
                let letterStyle = "bg-muted text-muted-foreground";
                
                if (showResult) {
                  if (index === question.correct) {
                    optionStyle = "!border-success !bg-success/10";
                    letterStyle = "bg-success text-success-foreground";
                  } else if (index === selectedAnswer && index !== question.correct) {
                    optionStyle = "!border-destructive !bg-destructive/10";
                    letterStyle = "bg-destructive text-destructive-foreground";
                  }
                }

                return (
                  <button
                    key={index}
                    className={`w-full p-4 bg-card border-4 border-border rounded-2xl shadow-[0_6px_0_hsl(var(--border))] flex items-center gap-4 text-left transition-all duration-150 hover:translate-y-[-2px] hover:shadow-[0_8px_0_hsl(var(--border))] active:translate-y-[2px] active:shadow-[0_2px_0_hsl(var(--border))] ${optionColors[index].bg} ${optionStyle} disabled:cursor-not-allowed`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg shadow-inner ${letterStyle}`}>
                      {optionLetters[index]}
                    </div>
                    <span className="font-body font-semibold text-foreground flex-1">{option}</span>
                    {showResult && index === question.correct && (
                      <CheckCircle className="w-7 h-7 text-success" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <XCircle className="w-7 h-7 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`mt-6 p-5 rounded-2xl border-4 ${
                selectedAnswer === question.correct
                  ? "bg-success/10 border-success"
                  : "bg-destructive/10 border-destructive"
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {selectedAnswer === question.correct ? (
                    <>
                      <span className="text-4xl">🎉</span>
                      <span className="font-display font-bold text-2xl text-success">Great Job!</span>
                      <Sparkles className="w-6 h-6 text-success" />
                    </>
                  ) : (
                    <>
                      <span className="text-4xl">💡</span>
                      <span className="font-display font-bold text-2xl text-destructive">Not quite!</span>
                    </>
                  )}
                </div>
                <p className="font-body font-semibold text-foreground">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          {showResult && (
            <Button
              variant="hero"
              size="xl"
              className="w-full gap-3"
              onClick={handleNextQuestion}
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-6 h-6" />
                </>
              ) : (
                <>
                  See Results
                  <Trophy className="w-6 h-6" />
                </>
              )}
            </Button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
