import { motion } from "framer-motion";

export default function Book({ leftPage, rightPage, opening = true }) {
  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        initial={opening ? { scale: 0.9, rotateY: -60 } : { scale: 1, rotateY: 0 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ perspective: 1600, perspectiveOrigin: "50% 50%" }}
        className="relative"
      >
        {/* Book body: two-page layout, spine, depth, texture */}
        <div
          className="relative flex flex-row items-stretch bg-[#f7f3e8] rounded-[2.5rem] shadow-2xl"
          style={{
            width: 800,
            height: 480,
            minWidth: 600,
            minHeight: 340,
            borderRadius: "2.5rem",
            border: "4px solid #e2c799",
            boxShadow: "0 24px 64px 0 #e2c79944, 0 2px 16px #c2a06c33",
            background: "repeating-linear-gradient(135deg, #f7f3e8 0 12px, #f6f1e7 12px 24px)",
            filter: "drop-shadow(0 8px 32px #e2c79988)",
            overflow: "visible",
            position: "relative"
          }}
        >
          {/* Left page */}
          <div
            className="flex-1 rounded-l-[2.5rem] relative overflow-hidden"
            style={{
              background: "url('https://www.transparenttextures.com/patterns/paper-fibers.png') repeat, #f7f3e8",
              boxShadow: "inset -12px 0 24px -12px #e2c79944",
              borderRight: "2px solid #e2c799",
              padding: "32px 24px 32px 40px"
            }}
          >
            {leftPage}
            {/* Inner shadow near spine */}
            <div className="absolute right-0 top-0 h-full w-8 pointer-events-none" style={{
              background: "linear-gradient(to left, #e2c79933 0%, #f7f3e800 100%)"
            }} />
          </div>
          {/* Spine */}
          <div
            className="w-8 flex-shrink-0 flex flex-col justify-center items-center relative z-10"
            style={{
              background: "linear-gradient(90deg, #e2c799 60%, #c2a06c 100%)",
              boxShadow: "0 0 16px #c2a06c inset, 0 0 8px #fff8ee",
              borderLeft: "2px solid #c2a06c",
              borderRight: "2px solid #c2a06c",
              borderRadius: "16px"
            }}
          >
            <div className="w-4 h-32 rounded-full bg-[#c2a06c] opacity-60" />
          </div>
          {/* Right page */}
          <div
            className="flex-1 rounded-r-[2.5rem] relative overflow-hidden"
            style={{
              background: "url('https://www.transparenttextures.com/patterns/paper-fibers.png') repeat, #f7f3e8",
              boxShadow: "inset 12px 0 24px -12px #e2c79944",
              borderLeft: "2px solid #e2c799",
              padding: "32px 40px 32px 24px"
            }}
          >
            {rightPage}
            {/* Inner shadow near spine */}
            <div className="absolute left-0 top-0 h-full w-8 pointer-events-none" style={{
              background: "linear-gradient(to right, #e2c79933 0%, #f7f3e800 100%)"
            }} />
          </div>
          {/* Page thickness illusion (stacked pages) */}
          <div className="absolute left-0 bottom-0 w-full h-6 rounded-b-[2.5rem]" style={{
            background: "repeating-linear-gradient(90deg, #e2c79922 0 2px, #f7f3e800 2px 8px)",
            opacity: 0.5,
            zIndex: 1
          }} />
        </div>
        {/* Soft shadow below book */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-32px] w-[80%] h-8 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, #c2a06c33 0%, #fff0 80%)",
            filter: "blur(2px)",
            zIndex: 0
          }}
        />
      </motion.div>
    </div>
  );
}
