const Document = require("../models/Document");
const axios = require("axios");
const generateSummary = require("../utils/aiSummary");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const pdfParse = require("pdf-parse-fork");
const chunkText = require("../utils/chunkText"); // 🔌 Import your chunking utility
const Favorite = require("../models/Favorite");

const parsePDF = async (buffer) => {
  return await pdfParse(buffer);
};

// ==========================
// UPLOAD PDF
// ==========================
const uploadDocument = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received:", req.file);

    // ☁️ Upload buffer to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const fileUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

    // 📄 Extract PDF text directly from buffer
    const data = await parsePDF(req.file.buffer);
    const fullText = (data.text || "").trim();

    if (!fullText) {
      return res.status(400).json({
        message: "Could not extract text from PDF file structure.",
      });
    }

    // 🍕 Generate clean, word-safe chunks from the FULL text stream
    const chunks = chunkText(fullText, 1000);

    // 🤖 AI summary safe mode (Pass up to ~15,000 chars to avoid model overflow)
    let summary = "";
    try {
      const summaryInputText = fullText.slice(0, 15000);
      summary = await generateSummary(summaryInputText);
    } catch (err) {
      console.error("AI Summary generation failed:", err.message);
      summary = "Summary generation unavailable at this moment.";
    }

    // 💾 Save to DB with chunks populated correctly!
    const doc = await Document.create({
      title: req.file.originalname,
      fileUrl,
      publicId,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      summary,
      chunks, // ✅ Core dataset mapping restored
    });

    return res.status(201).json({
      success: true,
      document: doc,
    });

  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET ALL DOCUMENTS
// ==========================
const getDocuments = async (req, res) => {
  try {
    const userId = req.user._id;

    const [docs, userFavorites] = await Promise.all([
      Document.find({ uploadedBy: userId }).sort({ createdAt: -1 }),
      Favorite.find({ userId }),
    ]);

    // Build a lookup map: documentId string → favorite _id string
    const favMap = {};
    userFavorites.forEach((fav) => {
      favMap[fav.documentId.toString()] = fav._id.toString();
    });

    const annotated = docs.map((doc) => {
      const plain = doc.toObject();
      const favId = favMap[plain._id.toString()];
      plain.isFavorite = !!favId;
      plain.favoriteId = favId || null;
      return plain;
    });

    return res.status(200).json({ success: true, documents: annotated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ==========================
// DELETE DOCUMENT
// ==========================
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (doc.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete from Cloudinary
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId, { resource_type: "raw" });
    }

    // Cascade delete: remove all favorites pointing to this document
    await Favorite.deleteMany({ documentId: id });

    // Delete from MongoDB
    await Document.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET SINGLE DOCUMENT BY ID
// ==========================
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document not found inside database.",
      });
    }

    if (doc.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this document.",
      });
    }

    return res.status(200).json({
      success: true,
      document: doc,
    });
  } catch (error) {
    console.error("Get Single Document Error:", error.message);
    return res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
  getDocumentById, 
};