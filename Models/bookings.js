const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  userId: String,
  userType: String,
  ownerName: String,
  sitterName: String,
  date: Date,
  address: String,
  confirmation: Boolean,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Find records by user id
const findByUserId = (userId) => {
  return Booking.findOne({ userId: userId });
};

module.exports = {
  findByUserId,
};
