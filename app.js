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
// Checks that the user is indeed a user and if so renders the home page. If not it redirects you to login.
// app.get('/', function(req, res) {
//   if (req.session && req.session.authenticated) {
//     // var activeUser = req.session.activeUser
//     var user = models.users.findOne({
//       where: {
//         username: req.session.username,
//         // id: req.session.activeUser,
//         // password: req.session.password,
//         // include: displayname
//       }
//     }).then(function(currentUser) {
//       models.messages.findAll({
//         include: [
//           {
//             model: models.users,
//             as: 'login'
//           }
//         ]
//       }).then(function(textbody, login, name){ res.render('home', {messages: textbody, user: currentUser, login: user.name})
//       })
//     })
//   } else {
//     res.redirect('/login')
//   }
//   // var activeUser = req.session.activeUser
//   // console.log(activeUser)
// })
// // app.get('/', function(req, res){
// //   if (req.session && req.session.authenticated){
// //     var user = models.users.findOne({
// //       where: {
// //         username: req.session.username,
// //       }
// //     }).then(function(textbody){res.render('home', {messages: textbody, user: currentUser})})
// //   }else {
// //     res.redirect('/login')
// //   }
// // })
//
// app.post('/', function(req, res){
//
//   // let username = req.body.username;
//   // let password = req.body.password;
//   //
//   // models.users.findOne({
//   //   where: {
//   //     username: username
//   //   }
//   // }).then(user => {
//   //   if(user.password == password) {
//   //     req.session.username = username;
//   //     req.session.authenticated = true;
//   //     res.redirect('/')
//   //   } else {
//   //     res.redirect('/login')
//   //   }
//   // })
//   const message = models.messages.build({
//     textbody: req.body.message,
//     // userid: req.session.userid
//   })
//   message.save().then(function(message) {
//     res.redirect('/')
//   });
// })
//
// // Get for the login page.
// app.get('/login', function(req, res){
//   res.render('login')
// })
// // Let username and password equal to what the user put in the form as username and password. find the username that was inputted in the database. Then if the inputted password equals to the database password then return that the authentication is complete and redirect to the home page where the messages are. If not redirect to the login.
// app.post('/login', function(req, res){
//   let username = req.body.username;
//   let password = req.body.password;
//
//   models.users.findOne({
//     where: {
//       username: username
//     }
//   }).then(user => {
//     if(user.password == password) {
//       req.session.username = username;
//       req.session.authenticated = true;
//       res.redirect('/')
//     } else {
//       res.redirect('/login')
//     }
//   })
// })
//
// app.get('/logout', function(req, res){
//   req.session.destroy();
//   res.redirect('/')
// })
// // get and post for the signup page.
// app.get('/signup', function(req, res){
//   res.render('signup')
// })
//
// app.post('/signup', function(req, res){
//   const newuser = models.users.build({
//     name: req.body.name,
//     username: req.body.username,
//     password: req.body.password
//   })
//
//   newuser.save().then(function(newuser){
//   req.session.username = newuser.username;
//   req.session.authenticated = true;
//   res.redirect('/')
// })
// })



app.listen(3000, function(){
  console.log('It has begun!')
});
