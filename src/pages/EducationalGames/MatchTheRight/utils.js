/* ================= SHUFFLE FUNCTION (Fisher-Yates) ================= */
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/* ================= BADGE/ACHIEVEMENT SYSTEM ================= */
export const BADGES = {
    PERFECT_MATCH: {
        id: "perfect-match",
        name: "Perfect Match",
        description: "Complete a level with 100% accuracy",
        icon: "⭐",
        condition: (score, totalCorrect) => score === totalCorrect,
    },
    LIGHTNING_FAST: {
        id: "lightning-fast",
        name: "Lightning Fast",
        description: "Complete a level with 50%+ time remaining",
        icon: "⚡",
        condition: (score, totalCorrect, timeLeft, maxTime) =>
            timeLeft >= maxTime * 0.5,
    },
    SPEED_DEMON: {
        id: "speed-demon",
        name: "Speed Demon",
        description: "Complete a level with 75%+ time remaining",
        icon: "🏃",
        condition: (score, totalCorrect, timeLeft, maxTime) =>
            timeLeft >= maxTime * 0.75,
    },
    NO_MISTAKES: {
        id: "no-mistakes",
        name: "No Mistakes",
        description: "Get 100% correct on your first try without retrying",
        icon: "🎯",
        condition: (score, totalCorrect, isFirstTry) =>
            score === totalCorrect && isFirstTry,
    },
    LEVEL_COLLECTOR: {
        id: "level-collector",
        name: "Level Collector",
        description: "Complete all levels",
        icon: "🏆",
        condition: null, // Special condition checked externally
    },
    SPEED_RACER: {
        id: "speed-racer",
        name: "Speed Racer",
        description: "Get 3 stars on 3 different levels",
        icon: "🚗",
        condition: null, // Special condition checked externally
    },
    PERFECT_CHAMPION: {
        id: "perfect-champion",
        name: "Perfect Champion",
        description: "Get 3 stars on 5 levels",
        icon: "👑",
        condition: null, // Special condition checked externally
    },
}

export const checkBadges = (
    score,
    totalCorrect,
    timeLeft,
    maxTime,
    isFirstTry,
    completedLevels,
    levelStars
) => {
    const unlockedBadges = []

    // Check regular conditions
    if (BADGES.PERFECT_MATCH.condition(score, totalCorrect)) {
        unlockedBadges.push(BADGES.PERFECT_MATCH.id)
    }
    if (BADGES.LIGHTNING_FAST.condition(score, totalCorrect, timeLeft, maxTime)) {
        unlockedBadges.push(BADGES.LIGHTNING_FAST.id)
    }
    if (BADGES.SPEED_DEMON.condition(score, totalCorrect, timeLeft, maxTime)) {
        unlockedBadges.push(BADGES.SPEED_DEMON.id)
    }
    if (BADGES.NO_MISTAKES.condition(score, totalCorrect, isFirstTry)) {
        unlockedBadges.push(BADGES.NO_MISTAKES.id)
    }

    // Check progress conditions
    if (completedLevels.length === 7) {
        unlockedBadges.push(BADGES.LEVEL_COLLECTOR.id)
    }

    const threeStarCount = Object.values(levelStars || {}).filter((s) => s === 3).length
    if (threeStarCount >= 3) {
        unlockedBadges.push(BADGES.SPEED_RACER.id)
    }
    if (threeStarCount >= 5) {
        unlockedBadges.push(BADGES.PERFECT_CHAMPION.id)
    }

    return unlockedBadges
}

/* ================= SOUND EFFECTS ================= */
export const playSound = (soundType) => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        switch (soundType) {
            case "unlock": // Badge/Achievement unlock sound
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
                oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)
                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.6)
                break

            case "levelup": // Level up sound
                oscillator.frequency.setValueAtTime(392, audioContext.currentTime)
                oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime + 0.2)
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8)
                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.8)
                break

            case "correct": // Correct match sound
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime)
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.3)
                break

            case "error": // Error sound
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.2)
                break

            default:
                break
        }
    } catch (error) {
        console.log("Sound unavailable:", error)
    }
}
