import express from "express";
import User from "../models/User.js";
import UserBadge from "../models/UserBadge.js";

const router = express.Router();

router.get("/user/:id/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const badges = await UserBadge.find({ userId: req.params.id });

    res.json({
      name: user.name,
      level: user.level,
      points: user.points,
      progress: user.progress,
      badges: badges.map(b => ({
        badge: b.badge,
        levelId: b.levelId,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

export default router;
