import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import badgeRoutes from "./routes/badges.js";
import dashboardRoutes from "./routes/dashboard.js";


const app = express();

app.use(cors());
app.use(express.json());

// 🔥 MOUNT ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api", dashboardRoutes);


mongoose
  .connect("mongodb://127.0.0.1:27017/edurights")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
