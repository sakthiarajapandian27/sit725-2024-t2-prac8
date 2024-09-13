const mongoose = require("mongoose");

//Todo: user owner schema type inside for details
const sitterBookingSchema = new mongoose.Schema({
  walkerId: String,
  ownerId: String,
  ownerName: String,
  time: Date,
  address: String,
  confirmation: Boolean,
});

const sitterBooking = mongoose.model("SitterBooking", sitterBookingSchema);

module.exports = {
  sitterBooking,
};
