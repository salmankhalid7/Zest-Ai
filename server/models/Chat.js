const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    question: String,
    answer: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);