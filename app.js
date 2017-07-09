const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const models = require('./models');
const routes = require('./routes');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// allows me to use my css styles sheet in the public folder.
app.use(express.static('public'));

app.use(session({
  secret: 'common sorcery',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(routes);


app.listen(3000, function(){
  console.log('It has begun!')
});
