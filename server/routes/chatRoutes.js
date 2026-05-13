const express = require("express");
const router = express.Router();

const { chatWithPDF } = require("../controllers/chatController");

router.post("/ask", chatWithPDF);

module.exports = router;