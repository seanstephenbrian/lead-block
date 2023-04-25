const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

/* GET admin log-in */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.get('/login-error', function(req, res, next) {
    res.render('login', { error: 'Login failed :(' });
});

router.post('/login-error', function(req, res, next) {
    res.render('login', { error: 'Login failed :(' });
})

// POST admin log-in
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login-error'
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
router.post('/new-user', 
    async (req, res, next) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                res.render('new-user');
            } else if (!user) {
                return next();
            }
        } catch(err) {
            return next(err);
        }
    },
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err);
            } else {
                try {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword
                    });
                    const result = await user.save();
                    res.redirect('/admin');
                } catch(err) {
                    return next(err);
                };
            }
        });
    }
);

module.exports = router;
