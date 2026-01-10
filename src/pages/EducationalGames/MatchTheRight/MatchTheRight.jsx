import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { levels } from "./data"

import mascot from "@/assets/mascot.png"

export default function MatchTheRight() {
    const [currentLevel, setCurrentLevel] = useState(0)
    const [matched, setMatched] = useState([])
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState("Drag and match correctly!")
    const [shakeId, setShakeId] = useState(null)
    const [timeLeft, setTimeLeft] = useState(levels[0].time)
    const [timeUp, setTimeUp] = useState(false)

    const round = levels[currentLevel].rounds[0]

    const totalCorrect = Object.keys(round.answers).length
    const levelCompleted = score === totalCorrect

    /* ================= TIMER ================= */
    useEffect(() => {
        if (levelCompleted) return
        if (timeLeft === 0) {
            setTimeUp(true)
            return
        }

        const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
        return () => clearTimeout(timer)
    }, [timeLeft, levelCompleted])

    /* ================= RESET LEVEL ================= */
    useEffect(() => {
        setMatched([])
        setScore(0)
        setTimeLeft(levels[currentLevel].time)
        setMessage("Drag and match correctly!")
        setTimeUp(false)
    }, [currentLevel])

    /* ================= HANDLE DROP ================= */
    const handleDrop = (situation, rightName) => {
        if (round.answers[situation] === rightName && !matched.includes(situation)) {
            setMatched([...matched, situation])
            setScore((s) => s + 1)
            setMessage("🎉 Correct! Great job!")
        } else {
            setShakeId(rightName)
            setMessage("😮 Oops! Try again!")
            setTimeout(() => setShakeId(null), 400)
        }
    }

    /* ================= RETRY LEVEL ================= */
    const handleRetry = () => {
        setMatched([])
        setScore(0)
        setTimeLeft(levels[currentLevel].time)
        setMessage("Drag and match correctly!")
        setTimeUp(false)
    }

    return (
        <>
            <Navbar />

            <div className="container mx-auto px-4 py-10">

                {levelCompleted && <Confetti recycle={false} numberOfPieces={300} />}

                {/* ================= TIME UP POPUP ================= */}
                <AnimatePresence>
                    {timeUp && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        >
                            <Card className="w-96 shadow-2xl">
                                <CardContent className="p-8 text-center">
                                    <h3 className="text-3xl font-bold mb-4">⏰ Time's Up!</h3>
                                    <p className="text-lg mb-2">
                                        You scored:
                                        <span className="font-bold text-2xl text-primary">
                                            {" "}{score}/{totalCorrect}
                                        </span>
                                    </p>
                                    <p className="text-muted-foreground mb-6">
                                        Don't worry, try again!
                                    </p>
                                    <button
                                        onClick={handleRetry}
                                        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                                    >
                                        Try Again 🔄
                                    </button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ================= HEADER ================= */}
                <h2 className="text-3xl font-bold text-center mb-4">
                    {levels[currentLevel].title}
                </h2>

                {/* ================= MASCOT ================= */}
                <div className="flex justify-center items-center gap-4 mb-4">
                    <img src={mascot} className="w-20" />
                    <p className="font-semibold">{message}</p>
                </div>

                {/* ================= STATS ================= */}
                <div className="flex justify-center gap-4 mb-8">
                    <Badge>⭐ {score}/{totalCorrect}</Badge>
                    <Badge>⏱ {timeLeft}s</Badge>
                </div>

                {/* ================= GAME GRID ================= */}
                <div
                    className="grid md:grid-cols-2 gap-10"
                    style={{ pointerEvents: timeUp ? "none" : "auto", opacity: timeUp ? 0.5 : 1 }}
                >

                    {/* LEFT – Situations */}
                    <div>
                        <h3 className="font-bold mb-3">Situations</h3>
                        <AnimatePresence>
                            {round.situations.map(
                                (sit) =>
                                    !matched.includes(sit) && (
                                        <motion.div
                                            key={sit}
                                            draggable={!timeUp}
                                            onDragStart={(e) =>
                                                e.dataTransfer.setData("text/plain", sit)
                                            }
                                            whileHover={{ scale: 1.05 }}
                                            className="mb-4 cursor-grab"
                                        >
                                            <Card>
                                                <CardContent className="p-4 text-center font-semibold">
                                                    {sit}
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT – Rights */}
                    <div>
                        <h3 className="font-bold mb-3">Child Rights</h3>
                        {round.rights.map((right) => (
                            <motion.div
                                key={right.name}
                                onDragOver={(e) => !timeUp && e.preventDefault()}
                                onDrop={(e) =>
                                    !timeUp &&
                                    handleDrop(
                                        e.dataTransfer.getData("text/plain"),
                                        right.name
                                    )
                                }
                                animate={
                                    shakeId === right.name
                                        ? { x: [-5, 5, -5, 5, 0] }
                                        : {}
                                }
                                className={`border-2 border-dashed rounded-xl p-5 text-center mb-4 ${right.color}`}
                            >
                                {right.name}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ================= NEXT ================= */}
                <AnimatePresence>
                    {levelCompleted && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        >
                            <Card className="w-96 shadow-2xl">
                                <CardContent className="p-8 text-center">
                                    <div className="text-6xl mb-4">🎉</div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        Congratulations!
                                    </h3>
                                    <p className="text-xl font-semibold text-primary mb-4">
                                        Level {currentLevel + 1} Complete! 🌟
                                    </p>

                                    {currentLevel < levels.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentLevel((l) => l + 1)}
                                            className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                                        >
                                            Next Level 🚀
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setCurrentLevel(0)}
                                            className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                                        >
                                            Restart Game 🔄
                                        </button>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            <Footer />
        </>
    )
}
