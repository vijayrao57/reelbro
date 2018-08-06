var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connection = require('./globals/dbconnection');

var jwtstr = require('./globals/authentication');


const fileUpload = require('express-fileupload');

var passport = require('passport');
var Strategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use('jwt', jwtstr.jwtstrt());

passport.use(new Strategy({
  clientID: '259397082112-2sfqmdkuvd1vnnt9nc79frf62fa49tp8.apps.googleusercontent.com',
  clientSecret: 'A_kO2wDQ5rGLXfFbIsHHQe-0',
  callbackURL : 'http://localhost:3000/googleredirect'
}, (accessToken, refreshToekn, profile, cb) => {
  console.log({
    accessToken : accessToken,
    refreshToekn : refreshToekn,
    profile: profile
  })
  return cb(null, profile);
}));

passport.use(new FacebookStrategy({
    clientID: '1573332826121447',
    clientSecret: 'de7ec2671b9b46168f5e053ddbe8cc10',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

mongoose.connect('mongodb://localhost:27017/reelbro');

var index = require('./routes/index');
var users = require('./routes/users');
var photo = require('./routes/photo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

app.use('/', index);
app.use('/users', users);
app.use('/photo', photo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
