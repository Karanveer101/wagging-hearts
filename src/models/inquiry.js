const Mongoose = require("mongoose");

const InquirySchema = new Mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    dogId: {
        type: String,
        required: true,
    },
    dogName: {
        type: String,
        required: true,
    },
    dogImage: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    conversation: [
        {
            sender: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Inquiry = Mongoose.model("inquiries", InquirySchema);
module.exports = Inquiry;
