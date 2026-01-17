import openai from "../lib/openai.js";
import { GPTS } from "../config/gpts.js";

export default async function (req, res) {
  // 1. Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your actual domain later for security
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Handle the Preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. Your existing logic
  try {
    const { message, gptId = "default" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const gptConfig = GPTS[gptId];
    if (!gptConfig) {
      return res.status(400).json({ error: "Invalid GPT ID" });
    }

    const completion = await openai.chat.completions.create({
      model: gptConfig.model,
      messages: [
        { role: "system", content: gptConfig.systemPrompt },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}