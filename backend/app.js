import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// app.use(cors());

app.use(cors({
    origin: "https://chatbot-dhys.vercel.app",
    credentials: true
}));

app.use(express.json());

app.use("/api/chat", chatRoutes);

export default app;
