const express = require("express");
const router = express.Router();

const {
  createFlashcards,
  getFlashcards,
} = require("../controllers/flashcardController");

// ✅ IMPORT AUTH MIDDLEWARE
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:documentId", authMiddleware, createFlashcards);

router.get("/:documentId", authMiddleware, getFlashcards);

module.exports = router;