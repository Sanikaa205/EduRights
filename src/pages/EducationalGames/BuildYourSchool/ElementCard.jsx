import { useDrag } from "react-dnd";

export default function ElementCard({ element, onAdd, unlocked, placed }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    canDrag: unlocked && !placed,
    item: element,
    end: (item, monitor) => {
      if (item && monitor.didDrop()) {
        onAdd(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [unlocked, placed, element, onAdd]);

  // Card style
  const baseStyle = `group rounded-2xl shadow-md p-4 transition-all duration-200 text-center select-none`;
  const unlockedStyle = `bg-white cursor-grab active:cursor-grabbing hover:shadow-lg hover:-translate-y-1`;
  const lockedStyle = `bg-gray-200 opacity-60 cursor-not-allowed relative`;
  const placedStyle = `opacity-30`;

  return (
    <div
      ref={unlocked && !placed ? drag : null}
      className={
        baseStyle +
        (unlocked ? ` ${unlockedStyle}` : ` ${lockedStyle}`) +
        (isDragging ? " opacity-40" : "") +
        (placed ? ` ${placedStyle}` : "")
      }
      style={{ pointerEvents: unlocked && !placed ? "auto" : "none" }}
    >
      {/* ICON or lock */}
      <div className="mb-2 flex justify-center items-center h-12">
        {unlocked ? (
          <span className="text-4xl drop-shadow-sm">{element.icon}</span>
        ) : (
          <span className="inline-block w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="7" y="11" width="10" height="7" rx="2"/><path d="M12 7v4"/><path d="M9 11V7a3 3 0 1 1 6 0v4"/></svg>
          </span>
        )}
      </div>

      {/* NAME */}
      <div className="text-base font-semibold font-[Fredoka]">
        {element.name}
      </div>

      {/* HINT or lock text */}
      <div className="text-xs text-muted-foreground mt-1 min-h-[18px]">
        {unlocked && !placed ? "Drag to build" : !unlocked ? "Locked" : placed ? "Already placed" : ""}
      </div>
    </div>
  );
}
