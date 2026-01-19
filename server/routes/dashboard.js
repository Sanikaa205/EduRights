import express from "express";
import User from "../models/User.js";
import UserBadge from "../models/UserBadge.js";
import QuizPoints from "../models/QuizPoints.js";
import LearnProgress from "../models/LearnProgress.js";

const router = express.Router();

router.get("/user/:id/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Get all badges grouped by game type
    const allBadges = await UserBadge.find({ userId: req.params.id });
    
    // Group badges by game type (handle legacy badges without gameType)
    const badgesByGame = {
      legalHero: allBadges.filter(b => b.gameType === "legalHero" || (!b.gameType && b.levelId <= 5)).map(b => ({
        badge: b.badge,
        levelId: b.levelId,
      })),
      brokenStory: allBadges.filter(b => b.gameType === "brokenStory").map(b => ({
        badge: b.badge,
        levelId: b.levelId,
      })),
      buildSchool: allBadges.filter(b => b.gameType === "buildSchool").map(b => ({
        badge: b.badge,
        levelId: b.levelId,
      })),
      matchTheRight: allBadges.filter(b => b.gameType === "matchTheRight").map(b => ({
        badge: b.badge,
        levelId: b.levelId,
      })),
    };

    // Calculate total points from QuizPoints collection
    const quizRecords = await QuizPoints.find({ userId: req.params.id });
    let computedPoints = 0;
    quizRecords.forEach((record) => {
      computedPoints += record.highestScore;
    });

    // Calculate progress for each game
    const gameProgress = {
      legalHero: Math.round((badgesByGame.legalHero.length / 5) * 100),
      brokenStory: Math.round((badgesByGame.brokenStory.length / 10) * 100),
      buildSchool: Math.round((badgesByGame.buildSchool.length / 6) * 100),
      matchTheRight: Math.round((badgesByGame.matchTheRight.length / 5) * 100),
    };

    // Calculate average games progress
    const gamesAvgProgress = Math.round(
      (gameProgress.legalHero + gameProgress.brokenStory + 
       gameProgress.buildSchool + gameProgress.matchTheRight) / 4
    );

    // Get learn progress (modules)
    const learnRecords = await LearnProgress.find({ userId: req.params.id });
    const totalModules = 6; // 6 modules in the app
    let learnTotalProgress = 0;
    learnRecords.forEach((record) => {
      learnTotalProgress += record.progress || 0;
    });
    const learnAvgProgress = Math.round(learnTotalProgress / totalModules);

    // Calculate overall progress (average of games and learn)
    const overallProgress = Math.round((gamesAvgProgress + learnAvgProgress) / 2);

    // Total badges count
    const totalBadges = badgesByGame.legalHero.length + badgesByGame.brokenStory.length + 
                        badgesByGame.buildSchool.length + badgesByGame.matchTheRight.length;

    res.json({
      name: user.name,
      level: user.level || 1,
      points: computedPoints,
      progress: overallProgress,
      gamesProgress: gamesAvgProgress,
      learnProgress: learnAvgProgress,
      badges: badgesByGame.legalHero, // Keep backward compatibility
      allBadges: badgesByGame,
      gameProgress,
      totalBadges: totalBadges,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

export default router;
