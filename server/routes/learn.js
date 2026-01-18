import express from "express";
import {
  getLearnProgress,
  updateLearnProgress,
  resetLearnProgress,
} from "../controllers/learnController.js";

const router = express.Router();

// GET /api/learn/progress/:userId - Get all module progress for a user
router.get("/progress/:userId", getLearnProgress);

// POST /api/learn/progress - Update progress for a specific module
router.post("/progress", updateLearnProgress);

// DELETE /api/learn/progress/:userId - Reset all progress for a user
router.delete("/progress/:userId", resetLearnProgress);

export default router;
