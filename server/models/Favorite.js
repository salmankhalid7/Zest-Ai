const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["flashcard", "quiz"],
      required: true,
    },

    question: String,
    answer: String,

    // optional for quiz MCQs
    options: [String],

    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);