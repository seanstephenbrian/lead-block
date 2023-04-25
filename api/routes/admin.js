const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

/* GET admin log-in */
router.get('/', function(req, res, next) {
    res.render('login');
});

// POST admin log-in
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin'
    })
);

// GET admin dashboard:
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { user: req.user });
});

// GET log out:
router.get('/log-out', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/admin');
    });
});

// GET new user form:
router.get('/new-user', function(req, res, next) {
    res.render('new-user');
});

// POST new user:
router.post('/new-user', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const result = await user.save();
        res.redirect('/admin');
    } catch(err) {
        return next(err);
    };
});

module.exports = router;
