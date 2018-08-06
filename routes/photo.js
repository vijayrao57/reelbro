var express = require('express');
var router = express.Router();
var users = require('../globals/user');

var auth = require('../globals/authentication');

var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('photo', { title: 'Photo Upload' });
});

router.post('/login', function(req, res){
    if(req.body.username && req.body.password){
        var name = req.body.username;
        var password = req.body.password;
    }

    var user = users.users[_.findIndex(users.users, {name: name})]

    if(!users){
        res.status(401).json({message: "user not found!"});
    }

    if(user.password === req.body.password){
        var payload = {id: user.id};
        auth.token(payload).then(function(tok){
          res.json({message: "ok", token: tok});
        }).catch(function(err){
            res.json({message: "error", error: error});
        })
    }
    else{
        res.status(401).json({message:"passwords did not match"});
    }
})


router.post('/upload', function(req, res, next){
    let file = req.files;
    if(!file){
        res.send("Photo doesn't exist!!!")
    } 
    else{
        console.log(file)
    }
});

router.get('/test', auth.authenticate(), function(req, res){
    res.json("Success! You can not see this without a token");
})


module.exports = router;
