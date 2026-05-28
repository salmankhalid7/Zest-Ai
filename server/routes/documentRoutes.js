const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");

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

// 📄 Get documents 
router.get("/", auth, getDocuments);

// 🗑 Delete document (PROTECTED)
router.delete("/:id", auth, deleteDocument);

module.exports = router;