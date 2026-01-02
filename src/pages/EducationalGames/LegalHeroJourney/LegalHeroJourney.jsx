import { useState } from "react";
import { levels as initialLevels } from "./levelsData";
import LevelCard from "./LevelCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Mascot from "@/assets/mascot.png";

export default function LegalHeroJourney() {
  // 1️⃣ Get saved level (default = 1)
  const savedLevel = Number(localStorage.getItem("legalHeroLevel")) || 1;

  // 2️⃣ Update levels based on saved progress
  const updatedLevels = initialLevels.map((level) => ({
    ...level,
    unlocked: level.id <= savedLevel,
  }));

  // 3️⃣ Store in state
  const [levels, setLevels] = useState(updatedLevels);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          🗺 Legal Hero Journey
        </h1>

        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          Complete levels, earn badges, and unlock new rights-based adventures.
        </p>

        <div className="relative">
  {levels.map((level) => (
    <LevelCard key={level.id} level={level}>
      {/* Mascot appears only on unlocked levels */}
      {level.unlocked && (
        <motion.img
          src={Mascot}
          alt="Mascot"
          className="w-12 h-12 absolute -top-6 right-4"
          animate={{ y: [0, -10, 0] }} // bouncing animation
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </LevelCard>
  ))}
</div>
      </div>
      <Footer />
    </>
  );
}
