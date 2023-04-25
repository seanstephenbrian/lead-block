const express = require('express');
const router = express.Router();

const Article = require('../models/article');

// GET all articles:
router.get('/', function(req, res, next) {
    Article.find({}, 'article')
        .sort({ timestamp: -1 })
        .populate('title author description timestamp body tags published')
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;