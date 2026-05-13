const express = require("express");
const router = express.Router();

const { createFlashcards } = require("../controllers/flashcardController");

router.post("/:documentId", createFlashcards);

module.exports = router;