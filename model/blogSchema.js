const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogPost);
module.exports = Blog ;