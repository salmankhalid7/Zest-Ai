const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware"); // ✅ FIX ADDED

const {
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocument
);

// 📄 Get documents (you may also protect this if needed)
router.get("/", auth, getDocuments);

// 🗑 Delete document (PROTECTED)
router.delete("/:id", auth, deleteDocument);

module.exports = router;