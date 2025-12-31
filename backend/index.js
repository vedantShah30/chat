import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import http from "http";
import { initSocket } from "./socket/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/chat", chatRouter);

const server = http.createServer(app);
initSocket(server);

connectDB();

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
