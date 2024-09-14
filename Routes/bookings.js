const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookings");
const asyncHandler = require("../Utils/asyncHandler");

// API routes for bookings

router.get("/:userId", bookingController.getBookingByUserId);

module.exports = router;
