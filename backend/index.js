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

/* 🔥 CORS — THIS IS CRITICAL */
app.use(
  cors({
    origin: [
      "https://chat-beta-nu.vercel.app",        // your prod frontend
      "http://localhost:5173"                   // local dev
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("ChatBeta Backend is running 🚀");
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
