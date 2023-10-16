const express = require("express");
const router = express.Router();
const favoritedController = require("../controller/favoritedController");

router.post("/addToFavorites", favoritedController.addToFavorites);
router.get("/getAllFavorites", favoritedController.getAllFavorites);
router.post('/removeFromFavorites', favoritedController.removeFromFavorites)

module.exports = router;
