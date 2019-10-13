const mongoose = require('mongoose');

const RoomTypesSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       unique: true
   },
   price: {
       type: Number,
       required: true
   }
});

module.exports = RoomTypes = mongoose.model('room_types', RoomTypesSchema);