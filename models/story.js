const mongoose = require('mongoose');

const Story = mongoose.model('Story', {
  title: String,
  author: String,
  storyText: String
});

module.exports = Story;
