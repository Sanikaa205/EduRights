import express from "express";
import { submitQuizScore, getUserPoints } from "../controllers/pointsController.js";

const router = express.Router();

// POST /api/points/submit/:userId - Submit quiz score
router.post("/submit/:userId", submitQuizScore);

// GET /api/points/:userId - Get total points and module scores
router.get("/:userId", getUserPoints);

export default router;
