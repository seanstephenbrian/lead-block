const express = require('express');
const router = express.Router();

/* GET admin log-in */
router.get('/', function(req, res, next) {
    res.render('login');
});

// POST admin log-in
router.post('/', function(req, res, next) {
    res.send(req.body);
})

module.exports = router;
