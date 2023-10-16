const express = require("express");
const router = express.Router();
const { sendInquiry, fetchInquiriesSent } = require("../controller/inquiryController");

router.post("/send", sendInquiry);
router.get('/fetchInquiriesSent', fetchInquiriesSent)

module.exports = router;
