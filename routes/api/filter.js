const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Bookings = require('../../models/Bookings');
const Rooms = require('../../models/Rooms');

// @route GET api/filter/room/count
// @desc Filter available rooms
// @access Public
router.get('/room/count', async (req, res) => {
    const {room_types} = req.body;

    //get count of all rooms of :type
    Rooms.countDocuments({room_types: room_types}, (err, count) => {
        res.json(count);
    });
    // const roomCount = await Rooms.countDocuments({room_types: room_types});
});

// @route GET api/filter/room/occupied/count
// @desc Filter available rooms
// @access Public
router.get('/room/occupied/count', async (req, res) => {
    const {room_types, check_in, check_out} = req.body;

    //get count of all room of :type with :check_in and :check_out
    Bookings.countDocuments(({room_types: room_types}, {check_in: {$gte: check_in, $lte: check_out}}, {check_out: {$gte: check_in, $lte: check_out}}), (err, count) => {
        res.json(count);
    });
});

// @route GET api/filter
// @desc Filter Bookings by Email or Phone
// @access Private
router.get('/', auth, async (req, res) => {
    const {filterTerm} = req.body;

    Bookings.find({$or: [{email: {$regex: filterTerm}}, {phone: {$regex: filterTerm}}]})
        .exec((err, docs) => {
            res.json(docs);
        });
});

module.exports = router;