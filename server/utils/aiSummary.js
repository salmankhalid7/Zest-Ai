const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const generateSummary = async (text) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Summarize this PDF:\n\n${text}`,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.error(err);
    return "Summary failed";
  }
};

module.exports = generateSummary;