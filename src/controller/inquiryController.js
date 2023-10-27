const Inquiry = require("../models/inquiry");
const verifyJwtToken = require("../middleware/verifyJwtToken");

async function sendInquiry(req, res) {
    const { dogId, message, status, dogName, dogImage, sender } = req.body;
    console.log(message);

    //message validation
    if (message.length > 100) {
        return res.status(400).json({
            message:
                "Message is too long. Maximum allowed length is 100 characters.",
        });
    }

    const decoded = await verifyJwtToken(req);
    const userId = decoded.userId;

    try {
        await Inquiry.create({
            userId: userId,
            dogId: dogId,
            status: status,
            dogName: dogName,
            dogImage: dogImage,
            conversation: [
                {
                    sender: sender,
                    message: message,
                },
            ],
        }).then((inquiry) => {
            res.status(200).json({
                message: "Inquiry successfully created",
                inquiry,
            });
        });
    } catch (error) {
        console.error("Inquiry not created:", error);
    }
}

async function fetchInquiriesSent(req, res) {
    const decoded = await verifyJwtToken(req);
    const userId = decoded.userId;
    try {
        // Find all inquiries in the collection by the registered user
        const inquiries = await Inquiry.find({ userId: userId });
        console.log("inquiries sent by user", inquiries);
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

async function deleteInquiry(req, res) {
    const inquiryId = req.params.id;
    console.log(inquiryId);
    try {
        // delete an inquiry
        const deletedInquiry = await Inquiry.deleteOne({ _id: inquiryId });
        console.log("the inquiry was deleted", deletedInquiry);
        res.status(200).json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = { sendInquiry, fetchInquiriesSent, deleteInquiry };
