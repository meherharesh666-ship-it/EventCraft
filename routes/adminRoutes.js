const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/adminController");
const adminProtect = require("../middleware/adminMiddleware");

// Admin Login
router.post("/login", adminLogin);

// Verify Admin
router.get("/verify", adminProtect, (req, res) => {
    res.status(200).json({
        message: "Admin verified successfully"
    });
});

module.exports = router;