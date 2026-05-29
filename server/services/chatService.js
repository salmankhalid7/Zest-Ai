const OpenAI = require("openai");

// Initialize and sanitize the Groq API key
const apiKey = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.trim() : "";

const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

const askAIAboutPDF = async (chunks, question) => {
  try {
    // 1. Guard check for input validity
    if (!question || question.trim() === "") {
      return "Please provide a valid question.";
    }

    if (!chunks || chunks.length === 0) {
      return "Not found in document.";
    }

    if (!apiKey) {
      console.error("GROQ_API_KEY is missing from environment configurations.");
      return "AI configuration error.";
    }

    // 2. Format context string out of received relevant chunks 
    // (Note: Selection/slicing is now handled dynamically in the chat controller)
    const context = chunks.join("\n\n");

    // 3. Trigger the Groq chat completion request
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // High reasoning capacity for scanning text blocks
      temperature: 0.2, // Low temperature forces high accuracy to the text context
      messages: [
        {
          role: "system",
          content: `
You are a highly precise PDF document assistant. 

CRITICAL DIRECTIVES:
- Answer the question using the provided text context chunks.
- If the user asks for a summary, main idea, overview, or what the document is about, use the provided context chunks to synthesize a clear, comprehensive response.
- Keep your answers clean, direct, and academic. Do not bring in outside knowledge.
- If the answer completely contradicts or cannot be reasonably inferred or found within the context chunks below, you must reply EXACTLY with: "Not found in document."
          `,
        },
        {
          role: "user",
          content: `
CONTEXT CHUNKS:
${context}

QUESTION:
${question}
          `,
        },
      ],
    });

    // 4. Return the raw string answer from the assistant
    return response.choices[0].message.content;

  } catch (error) {
    console.error("SMART SEARCH SERVICE ERROR:", error.message);
    return "AI error occurred";
  }
};

module.exports = { askAIAboutPDF };