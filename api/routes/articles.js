const express = require('express');
const router = express.Router();
const _ = require('lodash');

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
router.get('/tag/:tagQuery', function(req, res, next) {
    Article.find( { tags: req.params.tagQuery, published: true })
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
                next();
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
            });
    }
);

// GET general search results:
router.get('/search/:query',
    // find all results for tag query:
    function(req, res, next) {
        Article.find( { tags: req.params.query, published: true })
            .populate('title author description timestamp body tags published slug')
            .then((articles) => {
                if (articles) req.results = articles;
                next();
            })
            .catch((err) => {
                return next(err);
            });
    },
    // find results for author query:
    function(req, res, next) {
        Author.findOne({ name: _.startCase(_.toLower(req.params.query)) })
            .then((author) => {
                req.foundAuthor = author;
                next();
            })
            .catch((err) => {
                return next(err);
            });
    },
    // find articles by author:
    function(req, res, next) {
        Article.find({ author: req.foundAuthor, published: true })
            .populate('title author description timestamp body tags published slug')
            .then((articles) => {
                if (articles) {
                    res.json(req.results.concat(articles));
                } else {
                    res.json(req.results);
                }
            })
            .catch((err) => {
                return next(err);
            });
    }
)

module.exports = router;