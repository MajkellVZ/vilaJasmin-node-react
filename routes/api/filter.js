const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Bookings = require('../../models/Bookings');
const Rooms = require('../../models/Rooms');
const RoomTypes = require('../../models/RoomTypes');
const {check, validationResult} = require('express-validator/check');

// @route GET api/filter/room/count
// @desc Filter available rooms
// @access Public
router.get('/room/count', async (req, res) => {
    const {type} = req.query;

    const room_type = await RoomTypes.findOne({name: type});

    //get count of all rooms of :type
    Rooms.countDocuments({room_types: room_type._id}, (err, count) => {
        res.json(count);
    });
});

// @route GET api/filter/room/occupied/count
// @desc Filter available rooms
// @access Public
router.get('/room/occupied/count', [
    check('check_in', 'Check In Date required').not().isEmpty(),
    check('check_out', 'Check Out Date required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {type, check_in, check_out} = req.query;

    const room_type = await RoomTypes.findOne({name: type});

    //get count of all room of :type with :check_in and :check_out
    Bookings.countDocuments(({room_types: room_type._id}, {
        check_in: {
            $gte: check_in,
            $lte: check_out
        }
    }, {check_out: {$gte: check_in, $lte: check_out}}), (err, count) => {
        res.json(count);
    });
});

// @route GET api/filter
// @desc Filter Bookings by Email or Phone
// @access Private
router.get('/', auth, async (req, res) => {
    const {filter} = req.query;

    const page = parseInt(req.query.page) || 0;
    const limit = 10;

    Bookings.find({$or: [{email: {$regex: filter}}, {phone: {$regex: filter}}]})
        .skip(page * limit)
        .limit(limit)
        .populate('room_types')
        .exec((err, doc) => {
            if (err) {
                return res.json(err);
            }
            Bookings.countDocuments({$or: [{email: {$regex: filter}}, {phone: {$regex: filter}}]}).exec((count_err, count) => {
                if (err) {
                    return res.json(count_err);
                }
                // return res.json(docs);
                return res.json({
                    total: count,
                    page: page,
                    page_size: doc.length,
                    bookings: doc,
                    total_pages: Math.ceil(count / limit) - 1
                })
            });
        });
});

module.exports = router;