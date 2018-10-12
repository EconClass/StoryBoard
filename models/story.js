const mongoose = require('mongoose');

const Story = mongoose.model('Story', {
  title: String,
  description: String,
  author: String
});

module.exports = Story;
