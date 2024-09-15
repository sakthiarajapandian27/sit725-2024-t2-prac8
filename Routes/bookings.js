const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookings");
const path = require("path");

// API routes for bookings

router.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "Views",
      "userbookings",
      "bookingConfirmation.html"
    )
  );
});
router.get("/bookings/:userId", bookingController.getBookingByUserId);
router.put("/bookings/:userId", bookingController.confirmBooking);

module.exports = router;
