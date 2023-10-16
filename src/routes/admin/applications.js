const express = require("express");
const router = express.Router();
const {fetchInquiries, updateInquiryStatus} = require("../../controller/admin/applicationsController");

router.get("/inquiries", fetchInquiries);
router.post('/updateInquiryStatus', updateInquiryStatus)

module.exports = router;
