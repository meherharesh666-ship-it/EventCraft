const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");
const { login, getMe } = require("../controllers/loginController");

const protect = require("../middleware/authMiddleware");

// Registration API
router.post("/register", register);

// Login Route
router.post("/login", login);

// Protected Profile Route
router.get("/me", protect, getMe);

module.exports = router;