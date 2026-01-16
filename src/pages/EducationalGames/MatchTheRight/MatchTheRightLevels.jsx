import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import mascot from "@/assets/mascot.png"
import { levels } from "./data"

const UNLOCK_KEY = "matchTheRightUnlockedLevel"
const COMPLETE_KEY = "matchTheRightCompletedLevels"
const STARS_KEY = "matchTheRightStars"
const BADGES_KEY = "matchTheRightBadges"

const getUnlockedLevel = () => {
    const stored = Number(localStorage.getItem(UNLOCK_KEY))
    return Number.isFinite(stored) && stored > 0 ? stored : 1
}

const getCompletedLevels = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(COMPLETE_KEY))
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

const getLevelStars = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(STARS_KEY))
        return typeof parsed === "object" && parsed !== null ? parsed : {}
    } catch {
        return {}
    }
}

const getUnlockedBadges = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(BADGES_KEY))
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export default function MatchTheRightLevels() {
    const navigate = useNavigate();

    const unlockedLevel = useMemo(() => getUnlockedLevel(), []);
    const completedLevels = useMemo(() => getCompletedLevels(), []);
    const levelStars = useMemo(() => getLevelStars(), []);
    const unlockedBadges = useMemo(() => getUnlockedBadges(), []);

    const stats = useMemo(() => {
        const total = levels.length;
        const completed = completedLevels.length;
        const unlocked = Math.min(unlockedLevel, total);
        const totalStars = Object.values(levelStars).reduce((a, b) => a + b, 0);
        return { total, completed, unlocked, totalStars };
    }, [completedLevels.length, unlockedLevel, levelStars]);

    // Find the first unlocked but not completed level for 'Continue' button
    const nextPlayableLevel = useMemo(() => {
        for (let i = 1; i <= stats.unlocked; i++) {
            if (!completedLevels.includes(i)) return i;
        }
        // If all unlocked are completed, fallback to first unlocked
        return stats.unlocked;
    }, [stats.unlocked, completedLevels]);

    const handlePlay = (level) => {
        navigate(`/games/match-the-right/level/${level}`);
    };

    return (
        <>
            <Navbar />

            <main className="container mx-auto px-4 py-10">
                {/* HEADER */}
                <section className="flex flex-col gap-6 mb-10 text-center lg:text-left lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                        <img src={mascot} alt="EduRights mascot" className="w-20 h-20" />
                        <div>
                            <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                                Match The Right
                            </p>
                            <h1 className="text-4xl font-black text-slate-900 leading-tight">
                                Choose your level
                            </h1>
                            <p className="text-muted-foreground max-w-xl mt-2">
                                Unlock new challenges as you master each stage. Drag situations
                                to the correct rights and beat the timer!
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
                        <div className="px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-center">
                            <p className="text-3xl font-black">{stats.completed}</p>
                            <p className="text-sm font-semibold">Levels Completed</p>
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center">
                            <p className="text-3xl font-black">{stats.unlocked}/{stats.total}</p>
                            <p className="text-sm font-semibold">Unlocked</p>
                        </div>
                    </div>
                </section>

                

                

                {/* LEVEL GRID */}
                <section>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {levels.map((level, idx) => {
                            const round = level.rounds[0];
                            const matches = Object.keys(round.answers).length;

                            const unlocked = level.level <= stats.unlocked;
                            const completed = completedLevels.includes(level.level);

                            const stars = levelStars[level.level] || 0;

                            const statusBadge = completed
                                ? { label: "Completed", className: "bg-emerald-100 text-emerald-800" }
                                : unlocked
                                    ? { label: "Unlocked", className: "bg-blue-100 text-blue-800" }
                                    : { label: "Locked", className: "bg-gray-100 text-gray-600" };

                            return (
                                <motion.div
                                    key={level.level}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <div className="relative">
                                        {/* 🔒 LOCKED BLUR OVERLAY */}
                                        {!unlocked && (
                                            <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <p className="text-lg font-bold text-gray-600">🔒 Locked</p>
                                                    <p className="text-sm text-gray-500">
                                                        Complete previous level
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <Card
                                            className={`h-full border-2 ${unlocked
                                                ? "hover:shadow-lg transition-transform hover:-translate-y-1"
                                                : "opacity-60"
                                                }`}
                                        >
                                            <CardHeader className="flex flex-row justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    <CardTitle className="text-xl font-bold">
                                                        Level {level.level}
                                                    </CardTitle>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {level.title}
                                                    </p>
                                                </div>

                                                <Badge className={statusBadge.className}>
                                                    {statusBadge.label}
                                                </Badge>
                                            </CardHeader>

                                            <CardContent className="flex flex-col gap-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="secondary">⏱ {level.time}s</Badge>
                                                    <Badge variant="secondary">🧩 {matches} matches</Badge>
                                                    <Badge variant="secondary">🎯 1 round</Badge>
                                                </div>

                                                <p className="text-sm text-muted-foreground">
                                                    Match situations about child rights and avoid the traps!
                                                    Faster matches mean higher scores.
                                                </p>

                                                <div className="flex justify-end">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => unlocked && handlePlay(level.level)}
                                                        disabled={!unlocked}
                                                    >
                                                        {completed ? "Replay" : "Play"}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
