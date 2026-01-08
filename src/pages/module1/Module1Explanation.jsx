
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Module1Explanation() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf6ec]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-3xl w-full">
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
            >
              🔁 Re-learn
            </Button>
            <Button
              onClick={() => navigate("/module-1/quiz")}
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
