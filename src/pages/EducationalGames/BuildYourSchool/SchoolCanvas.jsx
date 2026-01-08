
import { useDrop } from "react-dnd";
import { useState, useEffect } from "react";

export default function SchoolCanvas({ builtElements, onDelete, schoolName, mascot }) {
  const [highlight, setHighlight] = useState(null); // 'green' | 'red' | null
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => {
      // Determine type for highlight
      if (item && item.type === "important") {
        setHighlight("green");
      } else if (item && item.type === "distraction") {
        setHighlight("red");
      }
      setTimeout(() => setHighlight(null), 700);
      return { placed: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-muted rounded-xl p-6 min-h-[420px]
      flex flex-col items-center gap-4
      ${isOver ? "border-4 border-primary" : ""}
      ${highlight === "green" ? "ring-4 ring-green-400 animate-pulse" : ""}
      ${highlight === "red" ? "ring-4 ring-red-400 animate-pulse" : ""}`}
    >
      {/* School name and mascot */}
      <div className="flex items-center gap-2 mb-2">
        {mascot && <span className="text-2xl">{mascot}</span>}
        <span className="font-bold text-lg">{schoolName || "Your School"}</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-start w-full">
        {builtElements.length === 0 && (
          <p className="text-muted-foreground text-center w-full">
            Drag elements here to build your school 🏗️
          </p>
        )}
        {builtElements.map((el) => (
          <div
            key={el.id}
            className="relative p-3 bg-white rounded-xl shadow-md w-28 text-center
                      hover:shadow-lg hover:scale-105 transition-transform"
          >
            <button
              onClick={() => onDelete(el)}
              className="absolute -top-2 -right-2 bg-red-500
              text-white rounded-full w-5 h-5 text-xs"
            >
              ×
            </button>
            <div className="text-3xl">{el.icon}</div>
            <div className="text-xs mt-1">{el.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
