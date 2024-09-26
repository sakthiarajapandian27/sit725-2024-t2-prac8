const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  ownerId: String,
  sitterId: String,
  ownerName: String,
  sitterName: String,
  date: Date,
  address: String,
  confirmation: Boolean,
  confirmed: Boolean,
});

const Booking = mongoose.model("Bookings", bookingSchema);

// Find records by user id
const findByUserId = (userId) => {
  return Booking.find({
    $or: [{ ownerId: userId }, { sitterId: userId }],
  });
};

const findByIdAndUpdate = (id, confirmation) => {
  return Booking.findOneAndUpdate(
    { _id: id },
    { confirmation: confirmation, confirmed: true }
  );
};

module.exports = {
  Booking,
  findByUserId,
  findByIdAndUpdate,
};
