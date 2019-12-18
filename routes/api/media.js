const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Image = require('../../models/Image');
const RoomType = require('../../models/RoomTypes');

// @route GET api/media/
// @desc Get all media
// @access Public
router.get('/', upload.single('room_image'), async (req, res) => {
    try {
        const media = await Image.find();
        if (!media) {
            return res.status(400).json({msg: 'Media not found'});
        }
        await res.json(media);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

// @route GET api/media/:room_type
// @desc Get media by room type
// @access Public
router.get('/:room_type', upload.single('room_image'), async (req, res) => {
    try {
        const {room_type} = req.params;
        let room_types = await RoomType.findOne({name: room_type});

        const media = await Image.find({room_types: room_types._id});
        if (!media) {
            return res.status(400).json({msg: 'Media not found'});
        }
        await res.json(media);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

// @route GET api/media/display/:image_path
// @desc Get media by path
// @access Public
router.get('/display/:image_path', upload.single('room_image'), async (req, res) => {
    try {
        const {image_path} = req.params;
        const media = await Image.find({image_path: image_path});
        if (!media) {
            return res.status(400).json({msg: 'Media not found'});
        }
        await res.sendFile(`/home/majkellvz/devconnector/uploads/${image_path}`);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

// @route POST api/media/:room_type
// @desc Upload media
// @access Private
router.post('/:room_type', auth, upload.array('room_image', 100), async (req, res) => {
        const files = req.files;
        if (!files) return res.status(400).json({errors: {msg: 'File missing'}});

        const {room_type} = req.params;
        let room_types = await RoomType.findOne({name: room_type});

        var response = [];

        for (var file of files) {

            var mediaFields = {};
            mediaFields.image_path = file.originalname;
            mediaFields.room_types = room_types._id;

            try {
                let media = new Image(mediaFields);
                await media.save();
                response.push(media);
            } catch (e) {
                console.log(e.message);
                response.push(e.message);
            }

            console.log(file.originalname);
        }

        await res.json(response);
    }
);

// @route DELETE api/media/:id
// @desc Delete media
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const {id} = req.params;
        await Image.findByIdAndRemove(id);
        await res.json({msg: 'Media Deleted'});
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;