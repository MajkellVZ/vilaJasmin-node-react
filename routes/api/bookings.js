const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');

const Bookings = require('../../models/Bookings');

// @route GET api/bookings
// @desc Show all bookings
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Bookings.find().populate('room');
        await res.json(bookings);
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
        const booking = await Bookings.findById(id).populate('room');
        if (!booking){
            return res.status(400).json({msg: 'Booking not found.'});
        }
        await res.json(booking);
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Booking not found.'});
        }
        res.status(500).send('server error');
    }
    //res.send('Room type route');
});

// @route POST api/bookings
// @desc Create booking
// @access Private
router.post('/', [auth, [
    check('email', 'Email required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('phone', 'Phone required').not().isEmpty(),
    check('room', 'Room Number required').not().isEmpty(),
    // check('check_in', 'Check In Date required').not().isEmpty(),
    // check('check_out', 'Check Out Date required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, phone, room, check_in, check_out} = req.body;

    const bookingFields = {};
    bookingFields.email = email;
    bookingFields.phone = phone;
    bookingFields.room = room;
    bookingFields.check_in = check_in;
    bookingFields.check_out = check_out;

    try {
        //Create
        let booking = new Bookings(bookingFields);
        await booking.save();
        await res.json(booking);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route PUT api/booking/:id
// @desc Update booking
// @access Private
router.put('/:id', [auth, [
    check('email', 'Email required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('phone', 'Phone required').not().isEmpty(),
    check('room', 'Room Number required').not().isEmpty(),
    // check('check_in', 'Check In Date required').not().isEmpty(),
    // check('check_out', 'Check Out Date required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, phone, room, check_in, check_out} = req.body;

    const bookingFields = {};
    bookingFields.email = email;
    bookingFields.phone = phone;
    bookingFields.room = room;
    bookingFields.check_in = check_in;
    bookingFields.check_out = check_out;

    try {
        //Update
        const {id} = req.params;
        let booking = await Bookings.findById(id);
        if (booking){
            booking = await Bookings.findByIdAndUpdate(
                {_id: id},
                {$set: bookingFields}
            );
            await res.json(booking);
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route DELETE api/booking/:id
// @desc Delete booking
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove Booking
        const {id} = req.params;
        await Bookings.findByIdAndRemove(id);
        await res.json({msg: 'Booking Deleted'});
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;


