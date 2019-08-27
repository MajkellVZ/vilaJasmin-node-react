const express = require('express');
const router = express.Router();

// @route GET api/rooms
// @desc Show all rooms
// @access Private
router.get('/', (req, res) => {
    res.send('Rooms route');
});

module.exports = router;