var mongoose = require('mongoose');
var mongoconnection = require('./globals');

var dburi = mongoconnection.MONGOCONNECTION_DEV;

var connection = {
    connection : function(){
        mongoose.connect(dburi);
    },
    dbevents : function(){
        mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection open to " + dburi);
        });

        mongoose.connection.on('error', (err) => {
        console.log("Mongoose default connection error " + dburi);
        });

        mongoose.connection.on('disconnect', () => {
        console.log("Mongoose default connection disconnected");
        });
    }
}


module.exports = connection;