const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const models = require('./models');

const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({
  secret: 'common sorcery',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(req, res){
  if (req.session && req.session.authenticated){
    var user = models.users.findOne({
      where: {
        username: req.session.username,
      }
    }).then(function(){res.render('home')})
  }else {
    res.redirect('/login')
  }
})

app.post('/', function(req, res){
  let username = req.body.username;
  let password = req.body.password;

  models.users.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if(user.password == password) {
      req.session.username = username;
      req.session.authenticated = true;
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
})

app.get('/login', function(req, res){
  res.render('login')
})

app.get('/signup', function(req, res){
  res.render('signup')
})

app.post('/signup', function(req, res){
  var newuser = models.users.build({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  })

newuser.save().then(function(newuser){
  req.session.username = newuser.username;
  req.session.authenticated = true;
  res.redirect('/')
})
})


app.listen(3000, function(){
  console.log('It has begun!')
});
