var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res) {
  // res.send("err");
  // User.getuserDetail();
  // res.send("hello");
  User.getuserDetail('prashant@reelbro.com', function(err, users){
    if(err){
      res.send(err);
      console.log(err);
    }
    else{
      res.send(users);
      console.log(users);
    }
  })
});

module.exports = router;
