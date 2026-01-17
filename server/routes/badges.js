import express from "express";
import UserBadge from "../models/UserBadge.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/earn", async (req, res) => {
  try {
    const { userId, levelId, badge } = req.body;

    if (!userId || !levelId || !badge) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await UserBadge.findOne({ userId, levelId });

    if (!exists) {
      await UserBadge.create({
        userId,
        levelId,
        badge,
      });

      // 🔥 Update User Level, Points, Progress
      await User.findByIdAndUpdate(userId, {
        $set: {
          level: levelId,
          progress: levelId * 25,  // example
          points: levelId * 100,   // example
        },
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Badge Error:", err.message);
    res.status(500).json({ error: "Failed to earn badge" });
  }
});

export default router;
