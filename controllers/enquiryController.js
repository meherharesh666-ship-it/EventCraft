
const Enquiry = require("../model/enquiry");

// CREATE ENQUIRY
const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
    } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// READ ALL ENQUIRIES
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();

    res.json({
      message: "Enquiries fetched successfully",
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// READ SINGLE ENQUIRY
const getSingleEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.json({ data: enquiry });
  } catch (error) {
    res.status(400).json({
      message: "Invalid enquiry ID",
      error: error.message,
    });
  }
};

// GET LOGGED-IN CUSTOMER ENQUIRIES
const getMyEnquiries = async (req, res) => {
  try {
    // Get logged-in customer email
    const Customer = require("../model/customer");

    const customer = await Customer.findById(req.customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Find enquiries using customer email
    const enquiries = await Enquiry.find({
      email: customer.email,
    });

    res.status(200).json({
      message: "Customer enquiries fetched successfully",
      data: enquiries,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer enquiries",
      error: error.message,
    });
  }
};

// UPDATE ENQUIRY
const updateEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
    } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        eventType,
        eventDate,
        guestCount,
        message,
      },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.json({
      message: "Enquiry updated successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// DELETE ENQUIRY
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.json({
      message: "Enquiry deleted successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid enquiry ID",
      error: error.message,
    });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getSingleEnquiry,
  getMyEnquiries,
  updateEnquiry,
  deleteEnquiry,
};


