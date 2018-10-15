const mongoose = require('mongoose');

const Story = mongoose.model('Story', {
    title: String,
    author: String,
    content: String
});

module.exports = Story;
