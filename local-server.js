import 'dotenv/config';

import express from "express";
import { chatHandler } from "./api/chat.js";

const app = express();
app.use(express.json());

app.post("/api/chat", (req, res) => {
  chatHandler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local test server running at http://localhost:${PORT}`);
});
