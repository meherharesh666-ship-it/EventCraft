
const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getAllEnquiries,
  getSingleEnquiry,
  getMyEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

// Public: Customer submits enquiry
router.post("/", createEnquiry);

// Admin: View all enquiries
router.get("/", adminProtect, getAllEnquiries);

// Customer: View own enquiries
router.get("/my-enquiries", protect, getMyEnquiries);

// Admin: View single enquiry
router.get("/:id", adminProtect, getSingleEnquiry);

// Admin: Update enquiry
router.put("/:id", adminProtect, updateEnquiry);

// Admin: Delete enquiry
router.delete("/:id", adminProtect, deleteEnquiry);

module.exports = router;
