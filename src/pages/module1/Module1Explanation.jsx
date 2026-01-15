
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Module1Explanation() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 relative overflow-hidden">
      {/* Playful background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-60 animate-bounce" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-40 animate-spin" />
        {/* Confetti */}
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
        <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
      </div>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 z-10">
        <div className="max-w-3xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 border-4 border-blue-200 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold mb-6">
            📚 What Did You Learn?
          </h2>
          <ul className="text-xl space-y-4 list-disc pl-6">
            <li>Every child aged 6–14 has the right to education.</li>
            <li>Government schools cannot charge fees.</li>
            <li>No child can be stopped because of money, caste, or gender.</li>
            <li>Education is a right, not a favor.</li>
          </ul>
          <div className="flex gap-4 mt-10">
            <Button
              variant="secondary"
              onClick={() => navigate("/module-1/start?openBook=true")}
              className="rounded-full text-lg py-3 px-8"
            >
              🔁 Re-learn
            </Button>
            <Button
              onClick={() => navigate("/module-1/quiz")}
                className="rounded-full text-lg py-3 px-8 bg-gradient-to-r from-pink-400 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition-transform"
            >
              🎯 Go to Quiz
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
