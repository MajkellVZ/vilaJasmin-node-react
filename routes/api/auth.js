const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');
// @route GET api/auth
// @desc
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        await res.json(user);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
    //res.send('auth route');
});

// @route POST api/auth
// @desc Authenticate
// @access Public
router.post('/', [
    check('email', 'Include valid email').isEmail(),
    check('password', 'Password required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try {
        //See if user exists
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({errors: [{msg: 'User already exists.'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid credentials.'}]});
        }

        //Return jwt
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            });
        //res.send('User registered');
    } catch (e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router;