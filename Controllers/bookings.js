const booking = require("../Models/bookings");

const getBookingByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await booking.findByUserId(userId);
    if (!bookings) {
      return res
        .status(404)
        .json({ error: "Failed to fetch specific booking1" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch specific booking2" });
  }
};

const confirmBooking = async (req, res) => {
  const { filter, update } = req.body;

  try {
    const updatedBooking = await booking.findByIdAndUpdate(
      filter.bookingId,
      update.confirmation
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed" });
    }
    console.log(error);
    res.status(500).json({
      error: "Failed to update booking",
    });
  }
};

// const getCompletedBookings = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const booking = await Booking.findOne({ userId }).sort({
//       date: { $gte: new Date() },
//     });
//     if (!booking) {
//       return res
//         .status(404)
//         .json({ error: "Failed to fetch specific booking" });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch specific booking" });
//   }
// };

module.exports = {
  getBookingByUserId,
  confirmBooking,
};
