import dotenv from "dotenv";
dotenv.config();

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
   🔥 CORS — PRODUCTION SAFE
   ======================= */
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin || // allow server-to-server / Postman
        origin.includes("vercel.app") || // ALL vercel preview + prod domains
        origin === "http://localhost:5173" // local dev
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =======================
   MIDDLEWARES
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
  res.send("ChatBeta Backend is running 🚀");
});

/* =======================
   START SERVER
   ======================= */
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
