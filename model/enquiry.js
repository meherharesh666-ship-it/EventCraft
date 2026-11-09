
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    eventType: {
        type: String,
        required: true
    },

    eventDate: {
        type: String,
        required: true
    },

    guestCount: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed"],
        default: "Pending"
    }

});

module.exports = mongoose.model("Enquiry", enquirySchema);
