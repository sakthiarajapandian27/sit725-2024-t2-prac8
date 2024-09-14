const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  userId: String,
  userType: String,
  ownerName: String,
  sitterName: String,
  date: Date,
  time: TimeRanges,
  address: String,
  confirmation: Boolean,
});

const booking = mongoose.model("Booking", bookingSchema);

module.exports = {
  booking,
};
