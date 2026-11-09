const Customer = require("../model/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// LOGIN API
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        // Find customer by email
        const customer = await Customer.findOne({
            email: email.toLowerCase().trim()
        });

        if (!customer) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            customer.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful
        const token = jwt.sign(
            { id: customer._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,

            customer: {
                id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

// GET LOGGED-IN CUSTOMER PROFILE
const getMe = async (req, res) => {
    try {
        const customer = await Customer.findById(req.customerId)
            .select("-password");

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer profile fetched successfully",
            customer
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch customer profile",
            error: error.message
        });
    }
};


module.exports = { login, getMe };