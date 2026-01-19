import QuizPoints from "../models/QuizPoints.js";

// POST /api/points/submit/:userId
// Submit quiz score - only updates if new score is higher
export const submitQuizScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const { moduleId, score } = req.body;

    // Validate inputs
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!moduleId || typeof moduleId !== "string") {
      return res.status(400).json({ message: "Valid moduleId is required" });
    }
    if (typeof score !== "number" || score < 0) {
      return res.status(400).json({ message: "Score must be a non-negative number" });
    }

    // Find existing record for this user + module
    const existingRecord = await QuizPoints.findOne({ userId, moduleId });

    let updated = false;
    let highestScore = score;

    if (existingRecord) {
      // Only update if new score is higher
      if (score > existingRecord.highestScore) {
        existingRecord.highestScore = score;
        await existingRecord.save();
        updated = true;
        highestScore = score;
      } else {
        // Keep existing highest score
        highestScore = existingRecord.highestScore;
        updated = false;
      }
    } else {
      // Create new record
      await QuizPoints.create({
        userId,
        moduleId,
        highestScore: score,
      });
      updated = true;
    }

    res.json({
      message: "Score submitted",
      moduleId,
      scoreReceived: score,
      highestScore,
      updated,
    });
  } catch (error) {
    console.error("Error submitting quiz score:", error);
    res.status(500).json({ message: "Failed to submit score" });
  }
};

// GET /api/points/:userId
// Get total points and module-wise scores for a user
export const getUserPoints = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all quiz records for this user
    const records = await QuizPoints.find({ userId });

    // Calculate total points and build moduleScores object
    let totalPoints = 0;
    const moduleScores = {};

    records.forEach((record) => {
      totalPoints += record.highestScore;
      moduleScores[record.moduleId] = record.highestScore;
    });

    res.json({
      totalPoints,
      moduleScores,
    });
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ message: "Failed to fetch points" });
  }
};
