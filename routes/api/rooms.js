const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');

const Rooms = require('../../models/Rooms');

// @route GET api/rooms
// @desc Show all rooms
// @access Public
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 10;
        const rooms = await Rooms.find()
            .skip(page * limit)
            .limit(limit)
            .populate('room_types')
            .exec((err, doc) => {
                if (err) {
                    return res.json(err);
                }
                Rooms.countDocuments().exec((count_err, count) => {
                    if (err) {
                        return res.json(count_err);
                    }
                    return res.json({
                        total: count,
                        page: page,
                        page_size: doc.length,
                        rooms: doc,
                        total_pages: Math.ceil(count / limit) - 1
                    })
                })
            });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route GET api/room/:id
// @desc Show one room by id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const room = await Rooms.findById(id).populate('room_types');
        if (!room) {
            return res.status(400).json({msg: 'Room not found.'});
        }
        await res.json(room);
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Room not found.'});
        }
        res.status(500).send('server error');
    }
    //res.send('Room type route');
});

// @route POST api/rooms
// @desc Create room
// @access Private
router.post('/', [auth, [
    check('room_number', 'Room Number required').not().isEmpty(),
    check('room_types', 'Room Type required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {room_number, room_types} = req.body;

    let room = await Rooms.findOne({room_number});
    if (room) {
        return res.status(400).json({errors: [{msg: 'Room already exists.'}]});
    }

    const roomFields = {};
    roomFields.room_number = room_number;
    roomFields.room_types = room_types;

    try {
        //Create
        let room = new Rooms(roomFields);
        await room.save();
        await res.json(room);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route PUT api/room/:id
// @desc Update Room
// @access Private
router.put('/:id', [auth, [
    check('room_number', 'Room Number required').not().isEmpty(),
    check('room_types', 'Room Type required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {room_number, room_types} = req.body;

    const roomFields = {};
    roomFields.room_number = room_number;
    roomFields.room_types = room_types;

    try {
        //Update
        const {id} = req.params;
        let room = await Rooms.findById(id);
        if (room) {
            room = await Rooms.findByIdAndUpdate(
                {_id: id},
                {$set: roomFields}
            );
            await res.json(room);
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route DELETE api/room/:id
// @desc Delete room
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove Room type
        const {id} = req.params;
        await Rooms.findByIdAndRemove(id);
        await res.json({msg: 'Room Deleted'});
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;