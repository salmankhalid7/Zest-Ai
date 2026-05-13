const Document = require("../models/Document");
const Chat = require("../models/Chat");
const { askAIAboutPDF } = require("../services/chatService");

// CHAT WITH PDF
const chatWithPDF = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    // Validate input
    if (!documentId || !question) {
      return res.status(400).json({ 
        success: false,
        message: "Document ID and question are required" 
      });
    }

    // 1. Get document with its chunks
    const doc = await Document.findById(documentId);

    if (!doc) {
      return res.status(404).json({ 
        success: false,
        message: "Document not found" 
      });
    }

    // Check if document has chunks (text was extracted)
    if (!doc.chunks || doc.chunks.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Document text not available for chat" 
      });
    }

    // 2. Get user ID from authenticated user (if using auth)
    const userId = req.user ? req.user.id : null;

    // 3. Send context to AI with document chunks
    const answer = await askAIAboutPDF(doc.chunks, question);

    // 4. Save chat interaction
    const chat = await Chat.create({
      documentId: doc._id,
      userId: userId,
      question: question,
      answer: answer,
      createdAt: new Date()
    });

    // 5. Return response
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
    console.error("Chat error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { chatWithPDF };