import mongoose from "mongoose";

const userBadgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameType: {
    type: String,
    enum: ["legalHero", "brokenStory", "buildSchool", "matchTheRight"],
    default: "legalHero",
  },
  levelId: {
    type: Number,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UserBadge", userBadgeSchema);
