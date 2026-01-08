import { motion } from "framer-motion";

export default function Page({ image, text, turnDirection = "right", isTurning = false }) {
  // turnDirection: "right" for next, "left" for previous
  // isTurning: true when animating page turn
  return (
    <motion.div
      initial={isTurning ? { rotateY: turnDirection === "right" ? 0 : -180, boxShadow: "0 0 0 #0000" } : { rotateY: 0, boxShadow: "0 0 0 #0000" }}
      animate={isTurning ? { rotateY: turnDirection === "right" ? -180 : 0, boxShadow: "-32px 0 64px -16px #c2a06c44" } : { rotateY: 0, boxShadow: "0 0 0 #0000" }}
      exit={{ opacity: 0 }}
      transition={{ duration: isTurning ? 0.8 : 0.5, ease: "easeInOut" }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
        borderRadius: "2rem",
        background: "#f7f3e8",
        boxShadow: isTurning ? "-32px 0 64px -16px #c2a06c44" : "0 2px 16px #c2a06c22",
        overflow: "hidden",
        position: "relative"
      }}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <img
        src={image}
        alt="Story illustration"
        className="rounded-xl shadow-lg mb-6"
        style={{ maxHeight: 220, width: "80%", objectFit: "contain" }}
      />
      <div className="font-serif text-[1.5rem] font-bold text-[#4b3f2a] leading-relaxed tracking-wide px-2" style={{ fontFamily: 'Playfair Display, Merriweather, serif', lineHeight: 1.5 }}>
        {text.map((line, i) => (
          <p key={i} className="mb-3">{line}</p>
        ))}
      </div>
      {/* Inner shadow for page fold */}
      <div className="absolute left-0 top-0 h-full w-8 pointer-events-none" style={{ background: "linear-gradient(to right, #e2c79933 0%, #f7f3e800 100%)" }} />
      <div className="absolute right-0 top-0 h-full w-8 pointer-events-none" style={{ background: "linear-gradient(to left, #e2c79933 0%, #f7f3e800 100%)" }} />
    </motion.div>
  );
}
