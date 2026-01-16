import { useNavigate } from "react-router-dom";
import { Lock, PlayCircle, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function LevelCard({ level, isUnlocked, isCompleted }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isUnlocked) {
      navigate(`/games/broken-story/level${level.id}`);
    }
  };

  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      onClick={handleClick}
      className={`relative p-6 rounded-2xl border-2 transition ${
        isUnlocked
          ? "cursor-pointer bg-white border-blue-300 hover:shadow-lg"
          : "cursor-not-allowed bg-gray-100 border-gray-300"
      }`}
    >
      {/* Level Number */}
      <div className="absolute top-4 right-4 text-2xl font-black text-blue-500">
        {level.id}
      </div>

      {/* Lock Icon */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
          <Lock className="w-12 h-12 text-white" />
        </div>
      )}


      {/* Badge Icon (only show if not completed) */}
      {!isCompleted && (
        <div className="text-5xl mb-3">{level.badge.split(" ")[0]}</div>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-800 mb-1">{level.title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-600 mb-4">{level.description}</p>


      {/* Completion Badge only */}
      {isCompleted && (
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mt-2">
          <Trophy className="w-4 h-4" />
          Completed
        </div>
      )}

      {/* Play Button */}
      {isUnlocked && !isCompleted && (
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
          <PlayCircle className="w-4 h-4" />
          Play
        </div>
      )}
    </motion.div>
  );
}
