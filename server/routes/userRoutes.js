const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

// GET PROFILE
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// UPDATE PROFILE
router.put("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.avatar = req.body.avatar || user.avatar;

  const updatedUser = await user.save();

  res.json(updatedUser);
});

module.exports = router;