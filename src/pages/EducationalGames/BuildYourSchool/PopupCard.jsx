import { useEffect, useState } from "react";

export default function PopupCard({ title, message, type, onClose }) {
  const [canClose, setCanClose] = useState(false);

  // Allow closing only AFTER popup is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClose(true);
    }, 200); // 200ms delay = current click finishes

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => {
          if (canClose) onClose();
        }}
      />

      {/* POPUP */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2
        z-50 w-[95%] max-w-xl
        rounded-2xl shadow-xl p-6
        animate-in fade-in zoom-in
        ${
          type === "success"
            ? "bg-green-100 border border-green-300"
            : "bg-yellow-100 border border-yellow-300"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-xl mb-2 text-center">
          {title}
        </h3>

        <p className="text-base text-gray-700 text-center leading-relaxed">
          {message}
        </p>

        <p className="text-xs text-center mt-3 text-muted-foreground">
          Tap anywhere outside to continue 👆
        </p>
      </div>
    </>
  );
}
