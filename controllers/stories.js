const express = require('express');
const app = express();
const Story = require('../models/story.js');
const Comment = require('../models/comment.js');

// INDEX
app.get('/', (req, res) => {
  Story.find().then(stories => {
      res.render('home.hbs', { stories: stories });
  }).catch(err => {
      console.log(err);
  });
});

// NEW
app.get('/stories/new', (req, res) => {
  res.render('stories-new.hbs', {});
});

// CREATE
app.post('/stories', (req, res) => {
  Story.create(req.body).then((stories) => {
      res.redirect('/');
  }).catch((err) => {
      console.log(err.message);
  });
});

// SHOW
app.get('/stories/:id', (req, res) => {
  Story.findById(req.params.id).then(stories => {
    Comment.find({ storiesId: req.params.id }).then(comments => {
      res.render('stories-show.hbs', { stories: stories, comments: comments });
    });
  }).catch((err) => {
    console.log(err.message);
  });
});

// EDIT
app.get('/stories/:id/edit', (req, res) => {
  Story.findById(req.params.id, function(err, stories) {
      res.render('stories-edit.hbs', {stories: stories});
  }).catch(err => {
      console.log(err.message);
  });
});

// UPDATE
app.put('/stories/:id', (req, res) => {
  Story.findByIdAndUpdate(req.params.id, req.body).then(stories => {
      // res.send(stories);
      res.redirect(`/stories/${stories._id}`);
  }).catch(err => {
      console.log(err.message);
  });
});

// DELETE
app.delete('/stories/:id', (req, res) => {
  Story.findByIdAndDelete(req.params.id).then(stories => {
      res.redirect('/');
  }).catch((err) => {
      console.log(err.message);
  });
});

module.exports = app;