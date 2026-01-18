import mongoose from "mongoose";

const learnProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moduleKey: {
      type: String,
      required: true,
      enum: [
        "module-1-progress",
        "module-2-progress",
        "module-3-progress",
        "module-4-progress",
        "module-5-progress",
        "module-6-progress",
      ],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Compound index to ensure one progress record per user per module
learnProgressSchema.index({ userId: 1, moduleKey: 1 }, { unique: true });

export default mongoose.model("LearnProgress", learnProgressSchema);
