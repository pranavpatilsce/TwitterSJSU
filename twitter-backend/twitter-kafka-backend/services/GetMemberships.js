var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');


function handle_request(msg, callback) {

    console.log("Inside get memberships msg----", msg)
    profileModel.find({_id: msg.id},{memberships:1}, function(err, results){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
        console.log("kafka getList memberships ",results[0]);
        callback(null, results[0]);
      }
    });
};
exports.handle_request = handle_request;