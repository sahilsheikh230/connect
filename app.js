import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import { createSocketServer } from "./socket.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("mongo error", err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRoutes);

createSocketServer(server);

const port = 3000;
server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

