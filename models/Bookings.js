const mongoose = require('mongoose');

// create booking Schema and model
const BookingSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    roomNo:{
        type: Number,
        required: [true, 'Room No. is required']
    },
    checkin: {
        type: Date,
        required: [true, 'Checkin date is required']
    },
    checkout: {
        type: Date,
        required: [true, 'Checkout date is required']
    },
    amount: {
        type: Number,
        required: [true, 'Total amount is required']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;