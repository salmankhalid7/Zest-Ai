const axios = require("axios");

const askAIAboutPDF = async (chunks, question) => {
  try {
    // take only first 3 chunks (simple version)
    const context = chunks.slice(0, 3).join("\n\n");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a PDF assistant.

Use ONLY this context:

${context}

QUESTION:
${question}

If answer is not in context, say "Not found in document."
                `,
              },
            ],
          },
        ],
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "AI error occurred";
  }
};

module.exports = { askAIAboutPDF };