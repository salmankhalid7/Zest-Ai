const Quiz = require("../models/Quiz"); 
const Document = require("../models/Document");
const generateQuiz = require("../services/quizService");
const QuizAttempt = require("../models/QuizAttempt");

// GET USER STATS
const getUserStats = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      userId: req.user.id,
    });

    const totalQuizzes = attempts.length;

    const avgScore =
      attempts.reduce((acc, curr) => acc + curr.score, 0) /
      (totalQuizzes || 1);

    res.json({
      totalQuizzes,
      avgScore,
      attempts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE QUIZ
const createQuiz = async (req, res) => {
  try {
    const { documentId } = req.params;

    // 1. Find the document
    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // 2. Call the updated Groq service (returns a parsed object already)
    const quizData = await generateQuiz(doc.summary);

    // 3. Extract the questions array safely from the standardized schema
    const quizQuestions = quizData?.quiz?.questions || [];

    if (quizQuestions.length === 0) {
      return res.status(500).json({
        message: "AI failed to parse relevant question sets from document text.",
      });
    }

    // 4. Save cleanly to Database
    const quizSet = await Quiz.create({
      documentId,
      userId: req.user?.id || null,
      questions: quizQuestions, 
    });

    // 5. Respond with the identical layout your React frontend expects
    return res.status(201).json({
      success: true,
      quiz: quizSet,
    });

  } catch (error) {
    console.error("CREATE QUIZ CONTROLLER ERROR:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// SAVE QUIZ RESULT
const saveQuizResult = async (req, res) => {
  try {
    const { quizId, documentId, score, total } = req.body;

    const attempt = await QuizAttempt.create({
      userId: req.user?.id || null,
      quizId,
      documentId,
      score,
      total,
    });

    res.status(201).json({
      success: true,
      attempt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getUserStats,
  saveQuizResult
};