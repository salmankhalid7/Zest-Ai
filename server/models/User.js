const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    minlength: 6,
    required: function () {
      return this.authProvider === "local";
    }
  },

  googleId: String,

  avatar: {
    type: String,
    default: "https://i.pravatar.cc/150"
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);