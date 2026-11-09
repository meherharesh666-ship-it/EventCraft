
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Models
const Users = require("./model/user");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enquiry Routes
app.use("/enquiry", require("./routes/enquiryRoutes"));

// Authentication Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// ================= USER CRUD =================

// CREATE USER
app.post("/users", async (req, res) => {
  try {
    const { Id, name, email, age, mob, Branch, addr } = req.body;

    const data = await Users.create({
      Id,
      name,
      email,
      age,
      mob,
      Branch,
      addr,
    });

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// READ ALL USERS
app.get("/users", async (req, res) => {
  try {
    const data = await Users.find();

    res.json({
      message: "Users fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// READ SINGLE USER
app.get("/users/:id", async (req, res) => {
  try {
    const user = await Users.findOne({
      Id: req.params.id,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ data: user });
  } catch (error) {
    res.status(400).json({
      message: "Invalid user ID",
      error: error.message,
    });
  }
});

// UPDATE USER
app.put("/users/:Id", async (req, res) => {
  try {
    const { name, email, age, mob, Branch, addr } = req.body;

    const student = await Users.findOneAndUpdate(
      { Id: req.params.Id },
      { name, email, age, mob, Branch, addr },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
  try {
    const data = await Users.findOneAndDelete({
      Id: req.params.id,
    });

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid user ID",
      error: error.message,
    });
  }
});


// START SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
