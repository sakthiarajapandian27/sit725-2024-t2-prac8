const { Booking } = require("../Models/bookings");

const getBookingByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const booking = await Booking.findOne({ userId }).sort({ date: -1 });
    if (!booking) {
      return res
        .status(404)
        .json({ error: "Failed to fetch specific booking" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch specific booking" });
  }
};

const confirmBooking = async (req, res) => {
  const { bookingId, userId, confirmation } = req.body;

  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { confirmation },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed" });
    }
    res.status(500).json({ error: "Failed to update booking" });
  }
};

const getCompletedBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const booking = await Booking.findOne({ userId }).sort({
      date: { $gte: new Date() },
    });
    if (!booking) {
      return res
        .status(404)
        .json({ error: "Failed to fetch specific booking" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch specific booking" });
  }
};

module.exports = {
  getBookingByUserId,
  confirmBooking,
};
