const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'rooms'
    },
    check_in: {
        type: Date,
        default: Date.now()
    },
    check_out: {
        type: Date,
        default: new Date(+new Date() + 24*60*60*1000)
    }
});

module.exports = Bookings = mongoose.model('bookings', BookingsSchema);