const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
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

const Media = require('../../models/Media');

// @route GET api/media/:id
// @desc Read media
// @access Public
router.get('/:id', upload.single('room_image'), async (req, res) => {
    try {
        const {id} = req.params;
        const media = await Media.find({rooms: id});
        if (!media) {
            return res.status(400).json({msg: 'Media not found'});
        }
        await res.json(media);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

// @route POST api/media
// @desc Upload media
// @access Private
router.post('/', upload.single('room_image'), async (req, res) => {

    const image_path = req.file.originalname;
    const {rooms} = req.body;

    let media = await Media.find({image_path});
    if (media) {
        return res.status(400).json({errors: {msg: 'Image already exists'}});
    }

    const mediaFields = {};
    mediaFields.image_path = image_path;
    mediaFields.rooms = rooms;

    try {
        let media = new Media(mediaFields);
        await media.save();
        await res.json(media);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

// @route DELETE api/media/:id
// @desc Delete media
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Media.findByIdAndRemove(id);
        await res.json({msg: 'Media Deleted'});
    } catch (e) {
        console.log(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;