import { motion } from "framer-motion"
import { useState } from "react"

export default function DroppableSlot({ item, onDrop }) {
    const [shake, setShake] = useState(false)

    const handleDrop = (e) => {
        const draggedId = e.dataTransfer.getData("text/plain")

        if (draggedId !== String(item.id)) {
            setShake(true)
            setTimeout(() => setShake(false), 400)
        }

        onDrop(draggedId, item.id)
    }

    return (
        <motion.div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
            className="rounded-xl border-2 border-dashed p-6 text-center min-h-[80px] bg-muted"
        >
            <p className="font-bold">{item.right}</p>
        </motion.div>
    )
}
