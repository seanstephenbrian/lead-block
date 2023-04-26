const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const Author = require('../models/author');

// GET all articles:
router.get('/', function(req, res, next) {
    Article.find({ published: true })
        .sort({ timestamp: -1 })
        .limit(6)
        .populate('title author description timestamp body tags published slug')
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            return next(err);
        });
});

// GET newest article:
router.get('/newest', function(req, res, next) {
    Article.find({ published: true })
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

// GET article by slug:
router.get('/:slug', function(req, res, next) {
    Article.findOne({ slug: req.params.slug, published: true })
        .populate('title author description timestamp body tags published')
        .then((article) => {
            res.json(article);
        })
        .catch((err) => {
            return next(err);
        });
});

// GET all articles matching search query:
router.get('/search/:query', function(req, res, next) {
    Article.find( { tags: req.params.query, published: true })
        .populate('title author description timestamp body tags published slug')
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            return next(err);
        });
});

// GET all articles by specified author:
router.get('/author/:authorQuery',
    // first find queried author in db:
    function(req, res, next) {
        Author.findOne({ name: req.params.authorQuery})
            .then((author) => {
                req.foundAuthor = author;
                next()
            })
            .catch((err) => {
                return next(err);
            });
    },
    // then find articles by author:
    function(req, res, next) {
        Article.find({ author: req.foundAuthor, published: true })
            .populate('title author description timestamp body tags published slug')
            .then((articles) => {
                res.json(articles);
            })
            .catch((err) => {
                return next(err);
            })
    }
);

module.exports = router;