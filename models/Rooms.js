const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
    room_number: {
        type: Number,
        required: true,
        unique: true
    },
    room_types: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'room_types'
    }
});

module.exports = Rooms = mongoose.model('rooms', RoomsSchema);