const Favorite = require("../models/Favorite");

// ADD TO FAVORITES
const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorite = await Favorite.create({
      userId,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      favorite,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      favorites,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Removed from favorites",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
};