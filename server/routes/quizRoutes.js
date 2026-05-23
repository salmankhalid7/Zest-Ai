const express = require("express");
const router = express.Router();
const {
  createQuiz,
  saveQuizResult,
  getUserStats
} = require("../controllers/quizController");



router.post("/:documentId", createQuiz);
router.get("/stats", getUserStats);

router.post("/attempt", saveQuizResult);
module.exports = router;