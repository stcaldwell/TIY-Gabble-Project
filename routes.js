const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');

const router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));



// Checks that the user is indeed a user and if so renders the home page. If not it redirects you to login.
router.get('/', function(req, res) {
  if (req.session && req.session.authenticated) {
    var user = models.users.findOne({
      where: {
        username: req.session.username,

      }
    }).then(function(currentUser) {
      models.messages.findAll({
        include: [
          {
            model: models.users,
            as: 'login'
          }
        ]
      }).then(function(textbody, login, name){ res.render('home', {messages: textbody, user: currentUser, login: user.name})
      })
    })
  } else {
    res.redirect('/login')
  }
})


router.post('/', function(req, res){

  const message = models.messages.build({
    textbody: req.body.message,
    userid: req.session.userid
  })
  message.save().then(function(message) {
    res.redirect('/')
  });
})

// Get for the login page.
router.get('/login', function(req, res){
  res.render('login')
})
// Let username and password equal to what the user put in the form as username and password. find the username, that was inputted, in the database. Then if the inputted password equals to the database password then return that the authentication is complete and redirect to the home page where the messages are. If not redirect to the login.
router.post('/login', function(req, res){
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

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/')
})
// get and post for the signup page.
router.get('/signup', function(req, res){
  res.render('signup')
})

router.post('/signup', function(req, res){
  const newuser = models.users.build({
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

module.exports = router;
