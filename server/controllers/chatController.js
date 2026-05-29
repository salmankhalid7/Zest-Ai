const Document = require("../models/Document");
const Chat = require("../models/Chat");
const { askAIAboutPDF } = require("../services/groqService"); // Ensure filepath points to your updated Groq helper

const chatWithPDF = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({ 
        success: false,
        message: "Document ID and question are required" 
      });
    }

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ 
        success: false,
        message: "Document not found" 
      });
    }

    if (!doc.chunks || doc.chunks.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Document text not available for chat processing" 
      });
    }

    // ─── CONTEXT SWITCHING ROUTER ENGINE ───
    const globalKeywords = ["main idea", "about", "summarize", "summary", "overview", "what is this", "explain the file"];
    const isGlobalQuery = globalKeywords.some(keyword => question.toLowerCase().includes(keyword));

    let relevantChunks = [];

    if (isGlobalQuery) {
      // Birds-eye distribution approach across document parts
      if (doc.chunks.length <= 3) {
        relevantChunks = doc.chunks;
      } else {
        const midIndex = Math.floor(doc.chunks.length / 2);
        relevantChunks = [
          doc.chunks[0],
          doc.chunks[midIndex],
          doc.chunks[doc.chunks.length - 1]
        ];
      }
      
      // Inject saved summary to contextual baseline if available
      if (doc.summary) {
        relevantChunks.unshift(`Document Pre-Summary Context: ${doc.summary}`);
      }
    } else {
      // Specific localized search
      const keywords = question.toLowerCase().split(" ").filter(w => w.length > 3);
      relevantChunks = doc.chunks.filter(chunk => 
        keywords.some(keyword => chunk.toLowerCase().includes(keyword))
      );

      // Fallback
      if (relevantChunks.length === 0) {
        relevantChunks = doc.chunks.slice(0, 3);
      } else {
        relevantChunks = relevantChunks.slice(0, 3);
      }
    }

    // Get active user ID if authenticated session exists
    const userId = req.user ? req.user.id : null;

    // Send the structured context chunks to Groq
    const answer = await askAIAboutPDF(relevantChunks, question);

    // Save chat interaction record
    const chat = await Chat.create({
      documentId: doc._id,
      userId: userId,
      question: question,
      answer: answer,
    });

    return res.status(200).json({
      success: true,
      answer: answer,
      chat: {
        id: chat._id,
        question: chat.question,
        answer: chat.answer,
        createdAt: chat.createdAt
      }
    });

  } catch (error) {
    console.error("Chat engine runtime exception:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { chatWithPDF };