const express = require("express");
const router = express.Router();

const {
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favoriteController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addFavorite);
router.get("/", protect, getFavorites);
router.delete("/:id", protect, deleteFavorite);

module.exports = router;