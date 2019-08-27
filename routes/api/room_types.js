const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');


const RoomTypes = require('../../models/RoomTypes');
const User = require('../../models/User');

// @route GET api/room/types
// @desc Show all room types
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const room_types = await RoomTypes.find();

        if (!room_types) {
            return res.status(400).json({msg: 'No room types found.'});
        }

        res.json(room_types);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
    //res.send('Room type route');
});

// @route GET api/room/type/id
// @desc Show one room type
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const room_type = await RoomTypes.findById();
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
    //res.send('Room type route');
});

// @route POST api/room/types
// @desc Create or Update Room Type
// @access Private
router.post('/', [auth, [
    check('name', 'Name required').not().isEmpty(),
    check('price', 'Price required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, price} = req.body;

    const roomTypeFields = {};
    roomTypeFields.name = name;
    roomTypeFields.price = price;

    try {
        // let roomType = roomType.findOne({name});
        // if (roomType) {
        //     //Update
        //     return res.json(roomType);
        // }

        //Create
        let roomType = new RoomTypes(roomTypeFields);
        await roomType.save();
        res.json(roomType);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;