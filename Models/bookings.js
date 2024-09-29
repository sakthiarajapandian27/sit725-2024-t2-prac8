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
  service: String,
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

const save = (bookingData) => {
  const obj = new Booking({
    ownerId: bookingData.ownerId,
    sitterId: bookingData.sitterId,
    ownerName: bookingData.ownerName,
    sitterName: bookingData.sitterName,
    date: bookingData.date,
    address: bookingData.address,
    service: bookingData.services,
    confirmation: false,
    confirmed: false,
  });

  return obj.save();
};

const findOneAndDelete = (bookingId) => {
  Booking.findByIdAndDelete(bookingId);
};

module.exports = {
  Booking,
  findByUserId,
  findByIdAndUpdate,
  save,
  findOneAndDelete,
};
