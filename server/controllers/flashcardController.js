const Flashcard = require("../models/Flashcard");
const Document = require("../models/Document");
const generateFlashcards = require("../services/flashcardService");

const createFlashcards = async (req, res) => {
  try {
    const { documentId } = req.params;

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const flashcardData = await generateFlashcards(doc.summary);
    let parsedData =
      typeof flashcardData === "string"
        ? JSON.parse(flashcardData)
        : flashcardData;

    const rawCards = parsedData.flashcards || parsedData.cards || [];

    if (rawCards.length === 0) {
      return res.status(500).json({
        message: "AI failed to generate a clean structured array of cards.",
      });
    }

    // ✅ FIXED: Normalize all possible AI field naming conventions
    const cardsArray = rawCards.map((card) => ({
      question: card.question || card.front || card.term || "",
      answer:   card.answer   || card.back  || card.definition || "",
    }));

    // ✅ Optional: warn if normalization still produced blanks
    const invalidCards = cardsArray.filter((c) => !c.question || !c.answer);
    if (invalidCards.length > 0) {
      console.warn(
        `⚠️ ${invalidCards.length} cards had missing question/answer after normalization.`,
        "Raw sample:", rawCards[0]
      );
    }

    const flashcardSet = await Flashcard.create({
      documentId,
      userId: req.user._id,
      cards: cardsArray,
    });

    return res.status(201).json({
      success: true,
      flashcards: flashcardSet,
    });
  } catch (error) {
    console.error("CREATE FLASHCARDS CONTROLLER ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createFlashcards };