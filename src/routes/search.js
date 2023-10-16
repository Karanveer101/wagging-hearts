const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController.js");
const bestMatchController = require("../controller/bestMatchController.js");

router.get("/search", searchController.search);
router.get("/homeDogDisplay", searchController.homeDogDisplay);
router.post("/best-matches", bestMatchController.getBestMatches);
router.get("/search-dog", searchController.searchById);

module.exports = router;
