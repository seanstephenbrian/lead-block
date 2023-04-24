var express = require('express');
var router = express.Router();

const Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('GET api index')
});

router.get('/articles', function(req, res, next) {
    Article.find({}, 'article')
        .sort({ timestamp: -1 })
        .populate('title author description timestamp body tags')
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            return next(err);
        });


    // Article.find({})
    //     // .populate('title author description timestamp body tags')
    //     // .sort({ timestamp: -1 })
    //     .then((articles) => {
    //         res.json(articles);
    //     })
    //     .catch((err) => {
    //         return next(err);
    //     });
});

module.exports = router;
