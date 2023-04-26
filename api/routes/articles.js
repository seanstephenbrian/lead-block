const express = require('express');
const router = express.Router();

const Article = require('../models/article');

// GET all articles:
router.get('/', function(req, res, next) {
    Article.find({})
        .sort({ timestamp: -1 })
        .limit(6)
        .populate('title author description timestamp body tags published')
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            return next(err);
        });
});

router.get('/newest', function(req, res, next) {
    Article.find({})
        .sort({ timestamp: -1 })
        .limit(1)
        .populate('title author description timestamp body tags published')
        .then((article) => {
            res.json(article);
        })
        .catch((err) => {
            return next(err);
        });
});

router.get('/:slug', function(req, res, next) {
    Article.findOne({ slug: req.params.slug })
        .populate('title author description timestamp body tags published')
        .then((article) => {
            res.json(article);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;