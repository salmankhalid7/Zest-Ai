const Document = require("../models/Document");
const QuizAttempt = require("../models/QuizAttempt");
const Flashcard = require("../models/Flashcard");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id; 

    console.log("DASHBOARD USER ID:", userId);
  // ADD THIS:
  const allDocs = await Document.find({});
  console.log("ALL DOCS IN DB:", allDocs.map(d => ({
    title: d.title,
    uploadedBy: d.uploadedBy
  })));
    const totalDocuments = await Document.countDocuments({
      uploadedBy: userId,
    });

    const totalQuizzes = await QuizAttempt.countDocuments({
      userId,
    });

    const attempts = await QuizAttempt.find({ userId });

    const avgScore =
      attempts.length > 0
        ? attempts.reduce((acc, curr) => acc + (curr.score || 0), 0) / attempts.length
        : 0;

    const totalFlashcards = await Flashcard.countDocuments({
      userId,
    });

    const recentQuizzes = await QuizAttempt.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentDocs = await Document.find({ uploadedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json({
      success: true,
      stats: {
        totalDocuments,
        totalQuizzes,
        totalFlashcards,
        avgScore: Number(avgScore).toFixed(2),
        recentQuizzes,
        recentDocs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };