const jwt = require("jsonwebtoken");

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check admin credentials
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                message: "Invalid admin email or password"
            });
        }

        // Generate Admin Token
        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Admin login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Admin login failed",
            error: error.message
        });
    }
};

module.exports = { adminLogin };