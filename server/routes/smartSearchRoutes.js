const express = require("express");
const router = express.Router();

const { smartSearch } = require("../controllers/smartSearchController");

router.post("/:documentId", smartSearch);

module.exports = router;