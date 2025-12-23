import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

/* =======================
   🔥 CORS — THIS IS THE FIX
   ======================= */
app.use(
  cors({
    origin: "https://chat-beta-4gt6ljdfd-varshajanakis-projects.vercel.app",
    credentials: true,
  })
);

/* =======================
   MIDDLEWARE
   ======================= */
app.use(express.json());
app.use(cookieParser());

/* =======================
   ROUTES
   ======================= */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

/* =======================
   HEALTH CHECK
   ======================= */
app.get("/", (req, res) => {
  res.json({ status: "ChatBeta backend is running" });
});

/* =======================
   START SERVER
   ======================= */
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
