const axios = require("axios");

const generateFlashcards = async (text) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `
Create flashcards from this text.

RULES:
- Return ONLY valid JSON
- Format:
[
  {"question": "...", "answer": "..."}
]
- Keep simple and clear

TEXT:
${text}
              `,
            },
          ],
        },
      ],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

module.exports = { generateFlashcards };