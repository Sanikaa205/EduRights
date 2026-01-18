import LearnProgress from "../models/LearnProgress.js";

// Get all module progress for a user
export const getLearnProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const progressRecords = await LearnProgress.find({ userId });

    // Convert to a map for easier frontend use
    const progressMap = {};
    progressRecords.forEach((record) => {
      progressMap[record.moduleKey] = record.progress;
    });

    res.json({ progress: progressMap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update or create progress for a specific module
export const updateLearnProgress = async (req, res) => {
  try {
    const { userId, moduleKey, progress } = req.body;

    if (!userId || !moduleKey) {
      return res
        .status(400)
        .json({ message: "User ID and module key are required" });
    }

    if (progress < 0 || progress > 100) {
      return res
        .status(400)
        .json({ message: "Progress must be between 0 and 100" });
    }

    const updateData = {
      progress,
    };

    // If progress is 100, set completedAt
    if (progress === 100) {
      updateData.completedAt = new Date();
    }

    const progressRecord = await LearnProgress.findOneAndUpdate(
      { userId, moduleKey },
      updateData,
      { new: true, upsert: true }
    );

    res.json({
      message: "Progress updated successfully",
      progress: progressRecord,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset all progress for a user (optional utility)
export const resetLearnProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    await LearnProgress.deleteMany({ userId });

    res.json({ message: "All progress reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
