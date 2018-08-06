var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/facebook', passport.authenticate('facebook'))

router.get('/googleredirect', passport.authenticate('google', {failureRedirect: '/google'}),
  function(req, res) {
    res.redirect('/');
  }
)

router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/facebook'}),
  function(req, res) {
    res.redirect('/');
  }
)

module.exports = router;
