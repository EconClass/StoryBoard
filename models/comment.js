const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  storiesId: {type: Schema.Types.ObjectId, ref: 'Story'}
});

module.exports = Comment;