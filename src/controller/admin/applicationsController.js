const Inquiry = require("../../models/inquiry");

async function fetchInquiries(req, res) {
    try {
        // Find all inquiries in the collection
        const inquiries = await Inquiry.find({})
            .populate({
                path: "userId",
                select: "firstName lastName email",
            })
            .exec();
        console.log("All inquiries in the inquiry collection:", inquiries);
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

async function updateInquiryStatus(req, res) {
    const { inquiryId, newValue } = req.body;
    try {
        // Find all inquiries in the collection
        await Inquiry.findByIdAndUpdate(inquiryId, {
            status: newValue,
            updatedAt: Date.now(),
        });
        res.status(200);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}
module.exports = { fetchInquiries, updateInquiryStatus };
