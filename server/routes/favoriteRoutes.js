const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getFavorites,
  deleteFavorite,
  deleteFavoriteByDocument,
} = require("../controllers/favoriteController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, addFavorite);
router.get("/", protect, getFavorites);
router.delete("/by-document/:documentId", protect, deleteFavoriteByDocument); // ← must be BEFORE /:id
router.delete("/:id", protect, deleteFavorite);

module.exports = router;