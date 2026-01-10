import { motion } from "framer-motion"

export default function DraggableCard({ item }) {
    return (
        <motion.div
            draggable
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", item.id)
            }
            className="cursor-grab rounded-xl bg-white p-4 shadow-md"
        >
            <p className="font-semibold text-center">
                {item.situation}
            </p>
        </motion.div>
    )
}
