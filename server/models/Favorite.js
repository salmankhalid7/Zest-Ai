const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    favoriteType: {
      type: String,
      enum: ["flashcard", "quiz", "document"],
      default: "document",
    },

    question: String,
    answer: String,
    options: [String],

    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);