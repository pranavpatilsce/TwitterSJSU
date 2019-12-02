var db = require('../Database');
var profile = db.Profile;
const bcrypt = require('bcrypt');

// var mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log('Inside signin!!!')
    profile.find({ email: msg.email }, function (error, results) {
        if (error) {
            console.log("error in results : error returned from database");
            throw error;
        }
        else if (results.length == 0) {
            output = "Incorrect userId";
            res.status(200).send(output);
        } else {
            console.log('Body Content', msg.password);
            console.log(results[0].password);

            bcrypt.compare(msg.password, results[0].password, function (error, resSt) {
                if (error) {
                    console.log("error in results ", error);
                    callback(error, "Error")
                }
                else if(resSt){
                    console.log(results);
                    callback(null, results);
                }else{
                    console.log(resSt);
                    callback(null,["credentials not Match"]);
                }
            });
        };
    });
}
exports.handle_request = handle_request;