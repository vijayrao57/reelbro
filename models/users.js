var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fName: String,
    lName: String,
    email: String,
    city: String,
    country: String,
    type: String,
    fulltime: String,
    available: String,
    birthday: String,
    bio: String,
    intrestedCategory: [String],
    rating: Number,
    equipments: {
        camera : [String],
        lens: [String]
    }
});

var userModel = mongoose.model('userModel', userSchema, 'user');

module.exports.getuserDetail = function(useremail, cb){
    userModel.find({}).where('email').equals(useremail).exec(cb);
}

module.exports.findUserAndCreate = function(user, cb){
    userModel.findOne({'email' : user.email}, function(err, user){
        if(err){
            handleError(err);
        }
        else{
            if(user.length > 0){
                return false;
            }
            else{
                userModel.create(user, function(err, res){
                    if(err){
                        handleError(err)
                    }
                    else{
                        return true;
                    }
                })
            }
        }
    });
}
