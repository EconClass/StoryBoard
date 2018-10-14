//========================================INITIAL========================================\\
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const storyControllers = require('./controllers/stories.js');

//========================================MIDDLEWARE========================================\\
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost/StoryBoard', { useNewUrlParser: true });

//========================================USE ROUTES========================================\\
app.use(storyControllers);

//==========================================LISTEN==========================================\\
app.listen(port, () => {
console.log('App listening on port ' + port + '!')
});

module.exports = app;