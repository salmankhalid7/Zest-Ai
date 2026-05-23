const Document = require("../models/Document");
const chunkText = require("../utils/chunkText");
const findBestChunk = require("../utils/findBestChunk");
const getAIAnswer = require("../services/smartSearchService");

const smartSearch = async (req, res) => {
  try {
    // 1. Support both route parameter naming styles (:id or :documentId) safely
    const documentId = req.params.documentId || req.params.id;
    
    // 2. Add an explicit safety guard block for the body payload
    if (!req.body) {
      return res.status(400).json({ 
        success: false, 
        message: "Payload body is completely missing. Make sure you are sending raw JSON data." 
      });
    }

    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot destructure property 'question' because it is missing or empty inside req.body." 
      });
    }

    if (!documentId || documentId === "undefined") {
      return res.status(400).json({ 
        success: false, 
        message: "Document identifier parameter is missing from the request URL routing path." 
      });
    }

    // 3. Retrieve document context from database using doc.summary fallback if needed
    const doc = await Document.findById(documentId);

    if (!doc) {
      return res.status(404).json({ 
        success: false, 
        message: `Document records matching ID ${documentId} could not be found.` 
      });
    }

    // Use extracted text context or fallback to summary content records string safely
    const sourceText = doc.extractedText || doc.summary || "";
    if (!sourceText.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "The found document contains no readable text context data layers for chunk searching." 
      });
    }

    // 4. Chunk text layers
    const chunks = chunkText(sourceText);

    // 5. Calculate and isolate best chunk via context match matching algorithms
    const bestChunk = findBestChunk(chunks, question);

    // 6. Request processed plain text analysis from Groq / AI Service layer
    const answer = await getAIAnswer(bestChunk, question);

    return res.json({
      success: true,
      answer,
    });

  } catch (err) {
    console.error("SMART SEARCH CONTROLLER ERROR:", err.message);
    return res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

module.exports = { smartSearch };