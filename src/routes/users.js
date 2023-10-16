const express = require("express");
const { register, getUserData } = require("../controller/userController");
const router = express.Router();
const userController = "../controller/userController.js";

router.post("/register", register);
router.get("/getUserData", getUserData);

module.exports = router;
