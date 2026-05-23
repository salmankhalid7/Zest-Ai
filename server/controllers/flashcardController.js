const Flashcard = require("../models/Flashcard");
const Document = require("../models/Document");
const generateFlashcards = require("../services/flashcardService");

// CREATE FLASHCARDS
const createFlashcards = async (req, res) => {
  try {
    const { documentId } = req.params;

    // 1. Find document
    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // 2. Generate flashcards (Assuming service returns parsed data object)
    const flashcardData = await generateFlashcards(doc.summary);
    
    // Support both stringified backends and pre-parsed objects seamlessly
    let parsedData = typeof flashcardData === "string" ? JSON.parse(flashcardData) : flashcardData;

    const cardsArray = parsedData.flashcards || [];

    if (cardsArray.length === 0) {
      return res.status(500).json({
        message: "AI failed to generate a clean structured array of cards.",
      });
    }

    // 3. Save directly in DB
    const flashcardSet = await Flashcard.create({
      documentId,
      userId: req.user?.id || null,
      cards: cardsArray, 
    });

    return res.status(201).json({
      success: true,
      flashcards: flashcardSet,
    });

  } catch (error) {
    console.error("CREATE FLASHCARDS CONTROLLER ERROR:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFlashcards,
};