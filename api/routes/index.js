const express = require('express');
const router = express.Router();

/* API index - redirect to admin log-in */
router.get('/', function(req, res, next) {
    res.redirect('/admin');
});

module.exports = router;
