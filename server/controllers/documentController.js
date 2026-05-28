const Document = require("../models/Document");
const axios = require("axios");
const generateSummary = require("../utils/aiSummary");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const pdfParse = require("pdf-parse-fork");

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
    const extractedText = (data.text || "").slice(0, 5000).trim();

    if (!extractedText) {
      return res.status(400).json({
        message: "Could not extract text from PDF",
      });
    }

    // 🤖 AI summary safe mode
    let summary = "";
    try {
      summary = await generateSummary(extractedText);
    } catch (err) {
      console.error("AI Error:", err.message);
      summary = "Summary not available";
    }

    // 💾 Save to DB
    const doc = await Document.create({
      title: req.file.originalname,
      fileUrl,
      publicId,
      fileSize: req.file.size,
      uploadedBy: req.user._id, // ✅ Standardized to _id
      summary,
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
    const docs = await Document.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      documents: docs,
    });
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
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // Security check
    if (req.user && doc.uploadedBy) {
      if (doc.uploadedBy.toString() !== req.user._id.toString()) { // ✅ Standardized to _id
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
    }

    // Delete from Cloudinary
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId, {
        resource_type: "raw",
      });
    }

    // Delete from MongoDB
    await Document.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
};