const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Document = require("../models/Document");
const { askAIAboutPDF } = require("../services/chatService"); // Check your exact filepath

// Middleware placeholder to verify JWT (Ensure you adapt to your project's auth middleware)
const protect = require("../middleware/authMiddleware"); 

// @route   GET /api/chat/:documentId
// @desc    Retrieve chat history for a document
router.get("/:documentId", async (req, res) => {
  try {
    const chats = await Chat.find({ 
      documentId: req.params.documentId,
      // userId: req.user.id // Add this if you want isolating histories per user account
    }).sort({ createdAt: 1 });

    // Map to structure matching frontend expected objects { q, a }
    const history = chats.map(chat => ({ q: chat.question, a: chat.answer }));
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching chat history" });
  }
});

// @route   POST /api/chat/ask
// @desc    Ask AI engine about document and save interaction record
router.post("/ask", async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({ message: "Missing document identity parameters or question context." });
    }

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: "Target document metadata not located." });
    }

    // Dynamic Chunk Filtering Strategy (replaces hard chunks.slice(0, 3))
    // Filters for chunks containing words from the question to maximize relevant context
    const keywords = question.toLowerCase().split(" ").filter(w => w.length > 3);
    let relevantChunks = doc.chunks.filter(chunk => 
      keywords.some(keyword => chunk.toLowerCase().includes(keyword))
    );

    // Fallback to first chunks if no keyword matches find anything
    if (relevantChunks.length === 0) {
      relevantChunks = doc.chunks.slice(0, 3);
    } else {
      relevantChunks = relevantChunks.slice(0, 3);
    }

    // Call Groq engine wrapper
    const aiAnswer = await askAIAboutPDF(relevantChunks, question);

    // Persist interaction to database
    const newChat = new Chat({
      documentId,
      question,
      answer: aiAnswer,
      // userId: req.user?.id // map if using protected session route integrations
    });
    await newChat.save();

    res.status(200).json({ answer: aiAnswer });
  } catch (error) {
    console.error("Route Error Context:", error);
    res.status(500).json({ message: "Internal server processing failure over AI prompt routing." });
  }
});

module.exports = router;