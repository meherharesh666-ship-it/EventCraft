
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    age: {
        type: Number
    },

    mob: {
        type: Number
    },

    Branch: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    addr: {
        type: String,
        required: true
    }
});

const users = mongoose.model("user", userSchema);

module.exports = users;
