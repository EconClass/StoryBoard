const express = require('express');
const app = express();
const Comment = require('../models/comment.js');

app.post('/stories/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
        res.redirect(`/stories/${comment.storiesId}`);
    }).catch((err) => {
        console.log(err.message);
    });
});

app.delete('/stories/comments/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id).then(comment => {
        res.redirect(`/stories/${comment.storiesId}`);
    }).catch((err) => {
        console.log(err.message);
    });
});

module.exports = app;