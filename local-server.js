import 'dotenv/config';
import cors from "cors"

import express from "express";
import { chatHandler } from "./api/chat.js";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'https://sprintogrowth.com', // Replace with '*' to allow all (not recommended for production)
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type'],    // Allow JSON data
};

app.use(cors(corsOptions)); // 3. Use the middleware


app.post("/api/chat", (req, res) => {
  chatHandler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local test server running at http://localhost:${PORT}`);
});
