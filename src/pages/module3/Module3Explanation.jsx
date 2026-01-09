import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Module3Explanation() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf6ec]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl font-bold mb-6">
            🟰 What Did You Learn?
          </h2>
          <ul className="text-xl space-y-4 list-disc pl-6">
            <li>Every child has the right to equality, regardless of background or identity.</li>
            <li>No one should be treated unfairly or discriminated against.</li>
            <li>We should respect and include everyone, no matter their differences.</li>
            <li>Equality helps everyone feel safe, valued, and able to reach their potential.</li>
          </ul>
          <div className="flex gap-4 mt-10">
            <Button
              variant="secondary"
              onClick={() => navigate("/module-3?openBook=true")}
            >
              🔁 Re-learn Module
            </Button>
            <Button
              onClick={() => navigate("/module-3/quiz")}
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
