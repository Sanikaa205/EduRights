import express from "express";
import UserBadge from "../models/UserBadge.js";
import User from "../models/User.js";

const router = express.Router();

// Earn badge for any game
router.post("/earn", async (req, res) => {
  try {
    const { userId, gameType, levelId, badge } = req.body;

    if (!userId || !gameType || !levelId || !badge) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check if badge already exists
    const exists = await UserBadge.findOne({ userId, gameType, levelId });

    if (!exists) {
      await UserBadge.create({
        userId,
        gameType,
        levelId,
        badge,
      });

      // Count total badges for this user across all games
      const totalBadges = await UserBadge.countDocuments({ userId });
      
      // Calculate overall progress based on total badges
      // Assuming total possible badges: legalHero(5) + brokenStory(10) + buildSchool(6) + matchTheRight(5) = 26
      const totalPossibleBadges = 26;
      const overallProgress = Math.round((totalBadges / totalPossibleBadges) * 100);

      // Update user's overall progress
      await User.findByIdAndUpdate(userId, {
        $set: {
          progress: overallProgress,
          level: Math.floor(totalBadges / 5) + 1, // Level up every 5 badges
        },
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Badge Error:", err.message);
    res.status(500).json({ error: "Failed to earn badge" });
  }
});

// Get badges for a specific game
router.get("/game/:gameType/:userId", async (req, res) => {
  try {
    const { gameType, userId } = req.params;
    const badges = await UserBadge.find({ userId, gameType });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch badges" });
  }
});

export default router;
