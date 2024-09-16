const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: Date,
    time: String
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
    Booking
};