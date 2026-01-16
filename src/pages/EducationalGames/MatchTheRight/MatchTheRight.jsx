import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { levels } from "./data"
import { checkBadges, playSound } from "./utils"
import { BADGES } from "./utils"

import mascot from "@/assets/mascot.png"

const UNLOCK_KEY = "matchTheRightUnlockedLevel"
const COMPLETE_KEY = "matchTheRightCompletedLevels"
const STARS_KEY = "matchTheRightStars"
const BADGES_KEY = "matchTheRightBadges"

const clampLevelIndex = (index) => {
    if (!Number.isFinite(index)) return 0
    return Math.min(levels.length - 1, Math.max(0, index))
}

const getStoredNumber = (key, fallback) => {
    if (typeof window === "undefined") return fallback
    const parsed = Number(localStorage.getItem(key))
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const getStoredArray = (key) => {
    if (typeof window === "undefined") return []
    try {
        const parsed = JSON.parse(localStorage.getItem(key))
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export default function MatchTheRight() {
    const navigate = useNavigate()
    const { levelId } = useParams()

    const initialIndex = clampLevelIndex((Number(levelId) || 1) - 1)

    const [currentLevel, setCurrentLevel] = useState(initialIndex)
    const [unlockedLevel, setUnlockedLevel] = useState(() => getStoredNumber(UNLOCK_KEY, 1))
    const [matched, setMatched] = useState([])
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState("Drag and match correctly!")
    const [shakeId, setShakeId] = useState(null)
    const [timeLeft, setTimeLeft] = useState(levels[initialIndex].time)
    const [timeUp, setTimeUp] = useState(false)
    const [retryCount, setRetryCount] = useState(0)
    const [badgeQueue, setBadgeQueue] = useState([]) // queue for multiple badges
    const [currentBadge, setCurrentBadge] = useState(null) // currently shown badge

    const levelData = levels[currentLevel] || levels[0]
    const round = levelData.rounds[0]
    const levelNumber = currentLevel + 1
    const totalLevels = levels.length
    const isLocked = levelNumber > unlockedLevel

    const totalCorrect = Object.keys(round.answers).length
    const levelCompleted = score === totalCorrect

    /* ================= GUARD LOCKED LEVELS ================= */
    useEffect(() => {
        if (!isLocked) return
        const fallbackLevel = clampLevelIndex(unlockedLevel - 1)
        navigate(`/games/match-the-right/level/${fallbackLevel + 1}`, { replace: true })
    }, [isLocked, unlockedLevel, navigate])

    /* ================= SYNC URL TO STATE ================= */
    useEffect(() => {
        const nextIndex = clampLevelIndex((Number(levelId) || 1) - 1)
        setCurrentLevel(nextIndex)
    }, [levelId])

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
        setTimeLeft(levelData.time)
        setMessage("Drag and match correctly!")
        setTimeUp(false)
        setRetryCount(0)
        setBadgeQueue([])
        setCurrentBadge(null)
    }, [currentLevel, levelData.time])

    /* ================= SAVE PROGRESS & BADGES ================= */
    useEffect(() => {
        if (!levelCompleted) return

        const completed = getStoredArray(COMPLETE_KEY)
        if (!completed.includes(levelNumber)) {
            const updated = [...completed, levelNumber]
            localStorage.setItem(COMPLETE_KEY, JSON.stringify(updated))
        }

        // Check badges
        const currentBadges = getStoredArray(BADGES_KEY)
        const isFirstTry = retryCount === 0
        const newBadges = checkBadges(score, totalCorrect, timeLeft, levelData.time, isFirstTry, completed)
        console.log("New Badges:", newBadges) // 🔹 debug

        const unlockedNow = newBadges.filter((badgeId) => !currentBadges.includes(badgeId))
        if (unlockedNow.length > 0) {
            setBadgeQueue(unlockedNow) // add all new badges to queue
            playSound("unlock")
            localStorage.setItem(BADGES_KEY, JSON.stringify([...currentBadges, ...unlockedNow]))
        }

        const currentUnlocked = getStoredNumber(UNLOCK_KEY, 1)
        const nextLevelNumber = Math.min(levelNumber + 1, levels.length)
        const newUnlocked = Math.max(currentUnlocked, nextLevelNumber)
        if (newUnlocked !== currentUnlocked) {
            localStorage.setItem(UNLOCK_KEY, String(newUnlocked))
            setUnlockedLevel(newUnlocked)
            playSound("levelup")
        }
    }, [levelCompleted, levelNumber, totalCorrect, timeLeft, levelData.time, retryCount])

    /* ================= HANDLE BADGE QUEUE ================= */
    useEffect(() => {
        if (!currentBadge && badgeQueue.length > 0) {
            setCurrentBadge(badgeQueue[0])
        }
    }, [badgeQueue, currentBadge])

    const handleBadgeClose = () => {
        setBadgeQueue((queue) => queue.slice(1))
        setCurrentBadge(null)
    }

    /* ================= HANDLE DROP ================= */
    const handleDrop = (situation, rightName) => {
        if (round.answers[situation] === rightName && !matched.includes(situation)) {
            setMatched([...matched, situation])
            setScore((s) => s + 1)
            setMessage("🎉 Correct! Great job!")
            playSound("correct")
        } else {
            setShakeId(rightName)
            setMessage("😮 Oops! Try again!")
            playSound("error")
            setTimeout(() => setShakeId(null), 400)
        }
    }

    /* ================= RETRY LEVEL ================= */
    const handleRetry = () => {
        setMatched([])
        setScore(0)
        setTimeLeft(levelData.time)
        setMessage("Drag and match correctly!")
        setTimeUp(false)
        setRetryCount((r) => r + 1)
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
                <div className="flex flex-col items-center gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary">Level {levelNumber}/{totalLevels}</Badge>
                        <Badge variant="secondary">⏱ {levelData.time}s</Badge>
                    </div>
                    <h2 className="text-3xl font-bold text-center">
                        {levelData.title}
                    </h2>
                    <button
                        onClick={() => navigate("/games/match-the-right")}
                        className="text-sm text-primary font-semibold hover:underline"
                    >
                        Back to Level Select
                    </button>
                </div>

                {/* ================= MASCOT ================= */}
                <div className="flex justify-center items-center gap-4 mb-4">
                    <img src={mascot} className="w-20" />
                    <p className="font-semibold">{message}</p>
                </div>

                {/* ================= STATS ================= */}
                <div className="flex justify-center gap-4 mb-8 flex-wrap">
                    <Badge>✓ {score}/{totalCorrect}</Badge>
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
                        {round.rights.map((right) => {
                            const isMatched = matched.some(
                                (sit) => round.answers[sit] === right.name
                            )
                            return (
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
                                    className={`border-2 rounded-xl p-5 text-center mb-4 transition-all duration-300 ${isMatched
                                        ? "bg-green-100 border-green-500 text-green-700 border-2"
                                        : "border-2 border-dashed " + right.color
                                        }`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {right.name}
                                        {isMatched && (
                                            <svg className="inline w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        )}
                                    </span>
                                </motion.div>
                            )
                        })}
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
                                    <p className="text-xl font-semibold text-primary mb-6">
                                        Level {currentLevel + 1} Complete! 🌟
                                    </p>

                                    {currentLevel < levels.length - 1 ? (
                                        <button
                                            onClick={() => {
                                                const nextLevel = currentLevel + 2
                                                navigate(`/games/match-the-right/level/${nextLevel}`)
                                            }}
                                            className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                                        >
                                            Next Level 🚀
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate("/games/match-the-right/level/1")}
                                            className="w-full px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                                        >
                                            Restart Game 🔄
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate("/games/match-the-right")}
                                        className="w-full mt-3 px-8 py-3 bg-white text-primary border border-primary rounded-xl font-semibold hover:bg-primary/5 transition"
                                    >
                                        📚 Choose Level
                                    </button>
                                    <button
                                        onClick={() => window.location.href = "/games"}
                                        className="w-full mt-3 px-8 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition"
                                    >
                                        🏠 Go to Games
                                    </button>
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
