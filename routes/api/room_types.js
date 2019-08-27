const express = require('express');
const router = express.Router();

// @route GET api/room/types
// @desc Show all room types
// @access Private
router.get('/', (req, res) => {
    res.send('Room type route');
});

module.exports = router;