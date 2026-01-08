import { motion, AnimatePresence } from "framer-motion";

export default function LevelUpAnimation({ show, badge }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti / stars */}
          <motion.div
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ y: -50, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight + 50 }}
                transition={{ duration: 1 + Math.random(), repeat: 0 }}
              />
            ))}
          </motion.div>

          {/* Badge pop */}
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
