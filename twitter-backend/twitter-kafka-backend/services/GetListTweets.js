var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

    console.log("Inside getListTweets msg----", msg)
    profileModel.find({userHandle: {$in:msg.members}},{tweets:1, name:1, userHandle:1}, function(err, results){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
        console.log("kafka getListTweets result ",results);
        callback(null, results);
      }
    });
};
exports.handle_request = handle_request;