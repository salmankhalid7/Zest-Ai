const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const generateFlashcards = async (text) => {
  try {
    // 1. Check for empty input to prevent empty prompt errors
    if (!text || text.trim() === "") {
      throw new Error("No source text provided for flashcard generation.");
    }

    // 2. Prevent huge inputs (matching your summary service strategy)
    const truncatedText = text.slice(0, 12000);

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      // 🔥 CRITICAL: Force the model to output a strict JSON object structure
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an expert educational AI. 
Your task is to generate high-quality flashcards from the provided text.

CRITICAL RULES:
- You must return a valid JSON object.
- The object must contain a top-level key named "flashcards" containing an array of objects.
- Each object in the array must have exactly two fields: "question" and "answer".
- Do not include any explanation, intro text, markdown formatting, or markdown backticks (\`\`\`).
IMPORTANT RULES:
- Focus ONLY on educational concepts
- Ignore metadata
- Return ONLY meaningful study material

Return ONLY valid JSON.
          `,
        },
        {
          role: "user",
          content: `
Generate educational flashcards from this text.

Expected JSON Structure:
{
  "flashcards": [
    {
      "question": "...",
      "answer": "..."
    }
  ]
}

PDF Content:
${truncatedText}
          `,
        },
      ],
    });

    // 3. Return the raw JSON string from Groq
    return response.choices[0].message.content;

  } catch (err) {
    console.error("FLASHCARD SERVICE ERROR:", err.message);
    throw new Error("Flashcard generation failed");
  }
};

module.exports = generateFlashcards;