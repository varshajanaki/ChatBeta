import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ✅ Backend-only health check
app.get("/", (req, res) => {
  res.send("ChatBeta Backend is running 🚀");
});

server.listen(port, () => {
  connectToMongoDb();
  console.log(`Server Running on port ${port}`);
});
