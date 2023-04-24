require('dotenv').config();
const mongoose = require('mongoose');
const async = require('async');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
  
// model definitions:
const Author = require('./models/author');
const Article = require('./models/article');

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const authors = [];

function authorCreate(name, cb) {

    const authorDetail = { name };

    const author = new Author(authorDetail);

    try {
        author.save();
        console.log('New Author: ' + author);
        authors.push(author);
        cb(null, author);
    } catch(err) {
        cb(err, null);
        return;
    }
}

function articleCreate(title, author, description, timestamp, body, tags, cb) {

    const articleDetail = { title, author, description, timestamp, body, tags };

    const article = new Article(articleDetail);

    try {
        article.save();
        console.log('New Article: ' + article);
        cb(null, article);
    } catch(err) {
        cb(err, null);
        return;
    }
}

function createAuthors(cb) {
    async.series(
        [
            function(callback) {
                authorCreate('Kevin Leibforth', callback);
            },
            function(callback) {
                authorCreate('Sean Delanty', callback);
            },
            function(callback) {
                authorCreate('John Smith', callback);
            }
        ],
        cb
    );
}

function createArticles(cb) {
    async.parallel(
        [
            function(callback) {
                articleCreate(
                    'Article 1',
                    authors[0],
                    'Description of Article 1',
                    new Date(),
                    lorem.generateParagraphs(7),
                    ['Tag 1', 'Tag 2', 'Tag 3'],
                    callback
                )
            },
            function(callback) {
                articleCreate(
                    'Article 2',
                    authors[1],
                    'Description of Article 2',
                    new Date(),
                    lorem.generateParagraphs(5),
                    ['Tag 2', 'Tag 3'],
                    callback
                )
            },
            function(callback) {
                articleCreate(
                    'Article 3',
                    authors[2],
                    'Description of Article 3',
                    new Date(),
                    lorem.generateParagraphs(10),
                    ['Tag 1', 'Tag 3', 'Tag 4', 'Tag 5'],
                    callback
                )
            },
            function(callback) {
                articleCreate(
                    'Article 4',
                    authors[0],
                    'Description of Article 4',
                    new Date(),
                    lorem.generateParagraphs(6),
                    ['Tag 1', 'Tag 3', 'Tag 4', 'Tag 5'],
                    callback
                )
            },
            function(callback) {
                articleCreate(
                    'Article 5',
                    authors[1],
                    'Description of Article 5',
                    new Date(),
                    lorem.generateParagraphs(11),
                    [],
                    callback
                )
            },
        ],
        cb
    )
}

async.series(
    [
        createAuthors,
        createArticles
    ],
    function(err, results) {
        if (err) {
            console.log('Error: ' + err);
        }
    }
);
