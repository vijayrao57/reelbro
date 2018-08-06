var _ = require('lodash');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJWt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = require('./user');
var global = require('../globals/globals');

var jwtoptions = {}

jwtoptions.jwtFromRequest = ExtractJWt.fromAuthHeaderAsBearerToken();
jwtoptions.secretOrKey = global.jwtsecretkey;



module.exports.jwtstrt = function(){
    var strategy  = new JwtStrategy(jwtoptions, function(jwt_payload, next){
            console.log('payload received', jwt_payload); //console.log
            var user = users[_.findIndex(users, {id: jwt_payload.id})];
            if(user){
                next(null, user)
            }else{
                next(null, false);
            }
    })
    
    return strategy;
}

module.exports.authenticate = function(){
    return passport.authenticate('jwt', {session: false}, function(err, user, info){
        if(err) return(err);
        else if(user != false || undefined ){
            return false
        }
        else{
            return user;
        }
    });
}

module.exports.token = function(payload){
    return new Promise((resolve, reject) => {
        let tok = jwt.sign(payload, global.jwtsecretkey);
        if(tok){
            resolve(tok);
        }
        else{
            reject({message: "Cannot sign token"})
        }
    })
}
