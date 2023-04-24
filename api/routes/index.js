var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('GET api index')
});

router.get('/blog', function(req, res, next) {
    res.json({ message: 'hello from the back end' });
});

module.exports = router;
