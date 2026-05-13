const Document = require("../models/Document");
const Flashcard = require("../models/Flashcard");
const { generateFlashcards } = require("../services/flashcardService");

// CREATE FLASHCARDS
const createFlashcards = async (req, res) => {
  try {
    const { documentId } = req.params;

    // 1. Get document
    const doc = await Document.findById(documentId);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 2. Generate flashcards from extracted text
    const raw = await generateFlashcards(doc.extractedText);

    // 3. Parse AI response
    let cards = [];

    try {
      cards = JSON.parse(raw);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid format",
      });
    }

    // 4. Save to DB
    const flashcardSet = await Flashcard.create({
      documentId,
      userId: req.user?.id,
      cards,
    });

    res.status(201).json({
      success: true,
      flashcards: flashcardSet,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFlashcards };