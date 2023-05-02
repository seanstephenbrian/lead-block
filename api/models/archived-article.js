const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchivedArticleSchema = new Schema({
    archivedTimestamp: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('ArchivedArticle', ArchivedArticleSchema);