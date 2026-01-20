import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import badgeRoutes from "./routes/badges.js";
import dashboardRoutes from "./routes/dashboard.js";
import learnRoutes from "./routes/learn.js";
import pointsRoutes from "./routes/pointsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/learn", learnRoutes);
app.use("/api/points", pointsRoutes);

// ENV
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/edurights";

// Mongo connect
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
