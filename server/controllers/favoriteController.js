const Favorite = require("../models/Favorite");

// POST /api/favorites
const addFavorite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { documentId, favoriteType, question, answer } = req.body;

    if (!documentId) {
      return res.status(400).json({ message: "documentId is required" });
    }

    // Prevent duplicates scoped to userId + documentId
    const existing = await Favorite.findOne({ userId, documentId });
    if (existing) {
      // Instead of erroring, return the existing one so frontend can sync
      return res.status(200).json({ success: true, favorite: existing, alreadyExists: true });
    }

    const favorite = await Favorite.create({
      userId,
      documentId,
      question: question || "",
      answer: answer || "",
      favoriteType: favoriteType || "document",
    });

    res.status(201).json({ success: true, favorite });
  } catch (err) {
    console.error("addFavorite Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const favorites = await Favorite.find({ userId })
      .populate("documentId")   // pulls full document object
      .sort({ createdAt: -1 });

    res.json({ success: true, favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/favorites/:id   (id = favorite _id)
const deleteFavorite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const favorite = await Favorite.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Ownership check
    if (favorite.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/favorites/by-document/:documentId  (unfavorite by doc id)
const deleteFavoriteByDocument = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { documentId } = req.params;

    await Favorite.findOneAndDelete({ userId, documentId });
    res.json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
  deleteFavoriteByDocument,
};