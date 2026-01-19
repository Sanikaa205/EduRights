import mongoose from "mongoose";

const quizPointsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
    },
    highestScore: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Compound unique index to ensure one record per user per module
quizPointsSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

export default mongoose.model("QuizPoints", quizPointsSchema);
