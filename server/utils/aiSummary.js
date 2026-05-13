const axios = require("axios");
require("dotenv").config();

const generateSummary = async (text) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this document in simple bullet points:\n\n${text}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Summary not generated"
    );

  } catch (error) {
// This will show the actual Google error message in your Postman response
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error("Gemini Error:", errorMessage);

    return `Error: ${errorMessage}`;
  }
};

module.exports = generateSummary;