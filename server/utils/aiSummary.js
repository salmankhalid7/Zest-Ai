const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const generateSummary = async (text) => {
  try {
    // Prevent huge inputs
    const truncatedText = text.slice(0, 12000);

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.3,

      messages: [
        {
          role: "system",
          content: `
You are an expert AI PDF summarizer.

Your task:
- Create concise summaries
- Keep important concepts
- Use simple language
- Return clean markdown
- Use bullet points when needed
          `,
        },

        {
          role: "user",
          content: `
Summarize the following PDF content.

Return:
1. Title
2. Main Summary
3. Key Points
4. Important Terms

PDF Content:
${truncatedText}
          `,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.error("SUMMARY ERROR:", err.message);

    return "Failed to generate summary";
  }
};

module.exports = generateSummary;