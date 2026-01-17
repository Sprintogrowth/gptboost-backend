import openai from "../lib/openai.js";
import { GPTS } from "../config/gpts.js";

// Change 'export async function chatHandler' to 'export default async function'
export default async function (req, res) {
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