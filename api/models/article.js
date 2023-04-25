const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
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
    }
});

ArticleSchema.virtual('date').get(function() {
    return DateTime.fromJSDate(this.timestamp).toFormat('MMMM dd, yyyy');
});

module.exports = mongoose.model('Article', ArticleSchema);