const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image_path: {
        type: String,
        required: true
    },
    room_types: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'room_types'
    }
});

module.exports = Image = mongoose.model('image', ImageSchema);