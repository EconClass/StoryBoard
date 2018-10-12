//========================================INITIAL========================================\\
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/StoryBoard', { useNewUrlParser: true });

//========================================MODEL========================================\\
const Story = mongoose.model('Story', {
    title: String,
    author: String,
    body: String
});
//========================================MIDDLEWARE========================================\\
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))


//========================================ROUTES========================================\\
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
        console.log(stories);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    });
});

// SHOW
app.get('/stories/:id', (req, res) => {
    Story.findById(req.params.id).then((stories) => {
        res.render('stories-show.hbs', { stories: stories })
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
    Story.findByIdAndUpdate(req.params.id, req.body)
    .then(stories => {
        res.redirect(`/stories/${stories._id}`);
    }).catch(err => {
        console.log(err.message);
    });
});

app.listen(port, () => {
console.log('App listening on port ' + port + '!')
});