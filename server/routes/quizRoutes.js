const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createQuiz,
  saveQuizResult,
  getUserStats,
  getQuizHistory
} = require("../controllers/quizController");

router.post("/:documentId", auth, createQuiz);

router.get("/stats", auth, getUserStats);
router.get("/history", auth, getQuizHistory);
router.post("/attempt", auth, saveQuizResult);

module.exports = router;