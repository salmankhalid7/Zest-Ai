const OpenAI = require("openai");

// Safely pull and sanitize the key
const apiKey = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.trim() : "";

const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1", 
});

const generateQuiz = async (text) => {
  try {
    // 1. Fallback double check for input text
    if (!text || text.trim() === "") {
      throw new Error("No source text provided for quiz generation.");
    }

    // 🛡️ Guard clause to block legacy rate-limit error strings from processing
    if (text.includes("Quota exceeded") || text.includes("generativelanguage.googleapis")) {
      throw new Error("The source document contains a legacy API quota error instead of readable educational text.");
    }

    // Safety check for the API key string container
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing or undefined in environment variables.");
    }

    const truncatedText = text.slice(0, 12000);

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an expert AI exam generator. Your task is to create multiple-choice questions from the provided text.

CRITICAL RULES:
- You must return a valid JSON object.
- The object must contain a top-level key named "quiz".
- Inside the "quiz" object, there must be a key named "questions" containing an array of 5 to 10 question objects.
- Each question object must have exactly three fields: "question", "options" (an array of exactly 4 strings), and "correctAnswer" (which must perfectly match one of the string values inside the options array).
- Do not include any explanation, intro text, markdown formatting, or markdown backticks.
          `,
        },
        {
          role: "user",
          content: `
Generate a multiple choice quiz from this text.

Expected JSON Structure:
{
  "quiz": {
    "questions": [
      {
        "question": "What is the primary function of an IP router?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A"
      }
    ]
  }
}

PDF Content:
${truncatedText}
          `,
        },
      ],
    });

    // Parse the string response into a real JavaScript object to verify structure before returning
    const parsedData = JSON.parse(response.choices[0].message.content);
    
    return parsedData;

  } catch (err) {
    console.error("QUIZ SERVICE ERROR:", err.message);
    throw new Error(`Quiz generation failed: ${err.message}`);
  }
};

module.exports = generateQuiz;