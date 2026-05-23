const OpenAI = require("openai");

// 1. Initialize and sanitize the Groq SDK client
const apiKey = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.trim() : "";

const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

const getAIAnswer = async (context, question) => {
  try {
    // 2. Validate incoming parameters
    if (!question || question.trim() === "") {
      throw new Error("No question provided for AI analysis.");
    }

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing from environment configurations.");
    }

    // 3. Truncate context to ~12k characters to stay safely within context boundaries
    const safeContext = context ? context.slice(0, 12000) : "No context available.";

    // 4. Trigger Groq Completion Call
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Fast, highly accurate reasoning engine
      temperature: 0.2, // Low temperature forces strict factual adherence to your document
      messages: [
        {
          role: "system",
          content: `
You are a helpful, precise AI academic tutor. 

CRITICAL DIRECTIVES:
- Answer the user's question using ONLY the provided text context.
- Keep your explanations clear, concise, and professional.
- If the answer cannot be found or reasonably inferred within the provided context, you must reply EXACTLY with: "Not found in document". Do not make up outside facts.
          `,
        },
        {
          role: "user",
          content: `
CONTEXT:
${safeContext}

QUESTION:
${question}
          `,
        },
      ],
    });

    // 5. Return the raw text answer string directly
    return response.choices[0].message.content;

  } catch (err) {
    console.error("AI ANSWER SERVICE ERROR:", err.message);
    throw new Error(`AI answer failed: ${err.message}`);
  }
};

module.exports = getAIAnswer;