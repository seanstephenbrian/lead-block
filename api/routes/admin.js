const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET admin log-in */
router.get('/', function(req, res, next) {
    res.render('login');
});

// POST admin log-in
router.post('/', async function(req, res, next) {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        res.send('no user found');
    } else if (user && user.password !== req.body.password) {
        res.send('incorrect password');
    } else {
        res.send('logged in');
    }
});

module.exports = router;
