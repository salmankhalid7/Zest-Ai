const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");

const {
  uploadDocument,
  getDocuments,
  deleteDocument,
  getDocumentById
} = require("../controllers/documentController");

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocument
);

// 📄 Get documents 
router.get("/", auth, getDocuments);

// 🗑 Delete document (PROTECTED)
router.delete("/:id", auth, deleteDocument);
router.get("/:id", protect, getDocumentById);

module.exports = router;