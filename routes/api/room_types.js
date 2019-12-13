const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');

const RoomTypes = require('../../models/RoomTypes');

// @route GET api/room/types
// @desc Show all room types
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 10;
        const room_types = await RoomTypes.find()
            .skip(page * limit)
            .limit(limit)
            .exec((err, doc) => {
                if (err) {
                    return res.json(err);
                }
                RoomTypes.countDocuments().exec((count_err, count) => {
                    if (err) {
                        return res.json(count_err);
                    }
                    return res.json({
                        total: count,
                        page: page,
                        page_size: doc.length,
                        room_types: doc,
                        total_pages: Math.ceil(count / limit) - 1
                    })
                })
            });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route GET api/room/type/:id
// @desc Show one room type by id
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const room_type = await RoomTypes.findById(id);
        if (!room_type) {
            return res.status(400).json({msg: 'Room Type not found.'});
        }
        await res.json(room_type);
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Room Type not found.'});
        }
        res.status(500).send('server error');
    }
    //res.send('Room type route');
});

// @route POST api/room/types
// @desc Create Room Type
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

    let room_type = await RoomTypes.findOne({name});
    if (room_type) {
        return res.status(400).json({errors: [{msg: 'Room Type already exists.'}]});
    }

    const roomTypeFields = {};
    roomTypeFields.name = name;
    roomTypeFields.price = price;

    try {
        //Create
        let roomType = new RoomTypes(roomTypeFields);
        await roomType.save();
        res.json(roomType);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route PUT api/room/types/:id
// @desc Update Room Type
// @access Private
router.put('/:id', [auth, [
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
        //Update
        const {id} = req.params;
        let roomType = await RoomTypes.findById(id);
        if (roomType) {
            roomType = await RoomTypes.findByIdAndUpdate(
                {_id: id},
                {$set: roomTypeFields}
            );
            await res.json(roomType);
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

// @route DELETE api/room/types/:id
// @desc Delete room type
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove Room type
        const {id} = req.params;
        await RoomTypes.findByIdAndRemove(id);
        await res.json({msg: 'Room Type Deleted'});
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;