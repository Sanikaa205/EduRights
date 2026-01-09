import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Module4Explanation() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf6ec]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl font-bold mb-6">
            🏀 What Did You Learn?
          </h2>
          <ul className="text-xl space-y-4 list-disc pl-6">
            <li>Every child has the right to play and relax.</li>
            <li>Play is important for learning, health, and happiness.</li>
            <li>All children should have safe places to play.</li>
            <li>Playing with others helps build friendships and teamwork.</li>
          </ul>
          <div className="flex gap-4 mt-10">
            <Button
              variant="secondary"
              onClick={() => navigate("/module-4?openBook=true")}
            >
              🔁 Re-learn Module
            </Button>
            <Button
              onClick={() => navigate("/module-4/quiz")}
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
