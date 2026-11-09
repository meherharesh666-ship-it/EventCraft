
const Customer = require("../model/customer");
const bcrypt = require("bcrypt");

// REGISTER API
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    // Check existing email
    const existingCustomer = await Customer.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful",
      customer: {
        id: newCustomer._id,
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        email: newCustomer.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

module.exports = { register };
