const Document = require("../models/Document");
const QuizAttempt = require("../models/QuizAttempt");
const Flashcard = require("../models/Flashcard");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Total documents
    const totalDocuments = await Document.countDocuments({
      uploadedBy: userId,
    });

    // 2. Total quizzes attempted
    const totalQuizzes = await QuizAttempt.countDocuments({
      userId,
    });

    // 3. Quiz attempts (for avg score)
    const attempts = await QuizAttempt.find({ userId });

    const avgScore =
      attempts.length > 0
        ? attempts.reduce((acc, curr) => acc + curr.score, 0) /
          attempts.length
        : 0;

    // 4. Total flashcards
    const totalFlashcards = await Flashcard.countDocuments({
      userId,
    });

    // 5. Recent activity (latest 5 actions)
    const recentQuizzes = await QuizAttempt.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentDocs = await Document.find({ uploadedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalDocuments,
        totalQuizzes,
        totalFlashcards,
        avgScore: avgScore.toFixed(2),
        recentQuizzes,
        recentDocs,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };