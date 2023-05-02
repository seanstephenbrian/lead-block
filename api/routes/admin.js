const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const sanitizeHtml = require('sanitize-html');
const { DateTime } = require('luxon');

const ArchivedArticle = require('../models/archived-article');
const Article = require('../models/article');
const Author = require('../models/author');
const User = require('../models/user');

const sanitizeConfig = {
    allowedAttributes: {
        'p': ['style']
    }
}

// GET admin log-in:
router.get('/', function(req, res, next) {
    res.render('login');
});

// POST admin log-in:
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login-error'
    })
);

// GET & POST for failed login:
router.get('/login-error', function(req, res, next) {
    res.render('login', { error: 'Login failed :(' });
});

router.post('/login-error', function(req, res, next) {
    res.render('login', { error: 'Login failed :(' });
})

// GET admin dashboard:
router.get('/dashboard', function(req, res, next) {
    Article.find({}, 'title author timestamp published')
        .sort({ timestamp: -1 })
        .populate('author')
        .then((blogArticles) => {
            blogArticles.forEach((article) => {
                if (article.author === null) {
                    article.author = { name: '' };
                }
            });
            res.render('dashboard', { articles: blogArticles })
        })
        .catch((err) => {
            return next(err);
        });
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
                    res.redirect('/admin/dashboard');
                } catch(err) {
                    return next(err);
                };
            }
        });
    }
);

// GET article edit:
router.get('/edit/:articleId', function(req, res, next) {
    Article.findById(req.params.articleId, 'title author description timestamp body tags published')
        .populate('author')
        .then((blogArticle) => {
            res.render('article-form', { article: blogArticle });
        })
        .catch((err) => {
            return next(err);
        });
});

// POST article edit:
router.post('/edit/:articleId', 
    // find existing author or save new author:
    async function(req, res, next) {

        // if author exists in db, find author; if not, create new author:
        const author = await Author.findOne({ name: req.body.author });
        if (author) {
            req.articleAuthor = author;
            next();
        } else {
            const newAuthor = new Author({ name: req.body.author });
            newAuthor.save()
                .then((savedAuthor) => {
                    req.articleAuthor = savedAuthor;
                    next();
                })
                .catch((err) => {
                    return next(err);
                });
        }
    },
    function(req, res, next) {
        // convert tag input to array format:
        let processedTags = [];
        if (req.body.tags !== '') {
            const unprocessedTags = req.body.tags.split(',');
            unprocessedTags.forEach((tag) => {
                processedTags.push(tag.trim().toLowerCase());
            });
        }

        // convert published input to boolean:
        let publishedStatus;
        if (req.body.published === 'true') {
            publishedStatus = true;
        } else {
            publishedStatus = false;
        }

        const updatedArticle = {
            title: req.body.title,
            author: req.articleAuthor,
            description: req.body.description,
            body: sanitizeHtml(req.body.body, sanitizeConfig),
            tags: processedTags,
            published: publishedStatus
        }

        // update article in db:
        Article.findByIdAndUpdate(req.params.articleId, updatedArticle)
            .then(() => {
                res.redirect('/admin/dashboard');
            })
            .catch((err) => {
                return next(err);
            });
    }
);

// GET create new article:
router.get('/new-article', function(req, res, next) {
    res.render('article-form');
});

// POST create new article:
router.post('/new-article',
    // find existing author or save new author:
    async function(req, res, next) {
        // if author exists in db, find author; if not, create new author:
        const author = await Author.findOne({ name: req.body.author });
        if (author) {
            req.articleAuthor = author;
            next();
        } else {
            const newAuthor = new Author({ name: req.body.author });
            newAuthor.save()
                .then((savedAuthor) => {
                    req.articleAuthor = savedAuthor;
                    next();
                })
                .catch((err) => {
                    return next(err);
                });
        }
    },
    function(req, res, next) {
        // convert tag input to array format:
        let processedTags = [];
        if (req.body.tags !== '') {
            const unprocessedTags = req.body.tags.split(',');
            unprocessedTags.forEach((tag) => {
                processedTags.push(tag.trim().toLowerCase());
            });
        }

        // convert published input to boolean:
        let publishedStatus;
        if (req.body.published === 'true') {
            publishedStatus = true;
        } else {
            publishedStatus = false;
        }

        const newArticle = new Article({
            title: req.body.title,
            author: req.articleAuthor,
            description: req.body.description,
            timestamp: DateTime.fromISO(req.body.timestamp).plus({ hours: 12 }).toJSDate(),
            body: sanitizeHtml(req.body.body, sanitizeConfig),
            tags: processedTags,
            published: publishedStatus
        });

        // save new article to db:
        newArticle.save()
            .then(() => {
                res.redirect('/admin/dashboard');
            })
            .catch((err) => {
                return next(err);
            });
    }
);

// GET delete article page:
router.get('/delete/:articleId', async function(req, res, next) {
    Article.findById(req.params.articleId, 'title author description timestamp body tags published')
        .populate('author')
        .then((foundArticle) => {
            res.render('delete', { article: foundArticle });
        })
        .catch((err) => {
            return next(err);
        });
});

// POST confirmed article deletion:
router.post('/confirmed-delete/:articleId',
    // save archived version of article:
    async function(req, res, next) {
        Article.findById(req.params.articleId, 'title author description timestamp body tags published slug')
            .populate('author')
            .then((article) => {
                return new ArchivedArticle({
                    archivedTimestamp: new Date(),
                    title: article.title,
                    author: article.author.name,
                    description: article.description,
                    timestamp: article.timestamp,
                    body: article.body,
                    tags: article.tags,
                    published: article.published,
                    slug: article.slug
                });
            })
            .then((archivedArticle) => {
                archivedArticle.save()
                    .then(() => next())
                    .catch((err) => {
                        return next(err);
                    });
            })
            .catch((err) => {
                return next(err);
            });
    },
    // then delete actual article:
    function(req, res, next) {
        Article.findByIdAndDelete(req.params.articleId)
            .then(() => res.redirect('/admin/dashboard'))
            .catch((err) => {
                return next(err);
            });
    }
);

module.exports = router;
