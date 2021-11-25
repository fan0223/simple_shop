const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        deafult: Date.now,
    },
});

module.exports = mongoose.model('Blog', BlogSchema);