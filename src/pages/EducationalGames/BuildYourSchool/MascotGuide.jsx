export default function MascotGuide({ message, mood = "happy" }) {
  const moodEmoji = {
    happy: "😊",
    thinking: "🤔",
    celebrate: "🎉",
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-40
      bg-white rounded-2xl shadow-lg
      p-4 flex items-start gap-3
      animate-in slide-in-from-left"
    >
      {/* Mascot */}
      <div className="text-4xl">
        🧸
      </div>

      {/* Message */}
      <div>
        <div className="text-lg">
          {moodEmoji[mood]} 
        </div>
        <p className="text-sm text-gray-700 max-w-[200px]">
          {message}
        </p>
      </div>
    </div>
  );
}
