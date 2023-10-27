const express = require("express");
const router = express.Router();
const {
    sendInquiry,
    fetchInquiriesSent,
    deleteInquiry,
} = require("../controller/inquiryController");

router.post("/send", sendInquiry);
router.get("/fetchInquiriesSent", fetchInquiriesSent);
router.delete("/:id", deleteInquiry);

module.exports = router;
