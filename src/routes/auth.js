const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/login", authController.login);
router.post("/verifyJwtToken", authController.verifyJwtToken);

module.exports = router;
