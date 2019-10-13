const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
   image_path: {
       type: String,
       required: true
   },
   rooms: {
       type: mongoose.Schema.Types.ObjectID,
       ref: 'rooms'
   }
});

module.exports = Media = mongoose.model('media', MediaSchema);