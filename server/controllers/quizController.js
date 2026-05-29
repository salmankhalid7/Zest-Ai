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

// GET ALL QUIZZES FOR USER
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.user.id })
      .populate('documentId', 'title') // This helps get the document name
      .sort({ createdAt: -1 });
      
    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USER QUIZ HISTORY
const getQuizHistory = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ userId: req.user.id })
      .populate('quizId', 'documentId') // Gets the quiz info
      .populate('documentId', 'title')  // Gets the title of the document
      .sort({ createdAt: -1 });         // Most recent first

    res.json({ success: true, attempts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Don't forget to export it
module.exports = {
  createQuiz,
  getUserStats,
  saveQuizResult,
  getAllQuizzes,
  getQuizHistory // Add this here
};