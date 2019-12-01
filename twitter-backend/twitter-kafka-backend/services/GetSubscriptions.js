var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');


function handle_request(msg, callback) {

    console.log("Inside get subscriptions msg----", msg)
    profileModel.find({_id: msg.id},{subscriptions:1}, function(err, results){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
        console.log("kafka getsubscriptions ",results[0]);
        callback(null, results[0]);
      }
    });
};
exports.handle_request = handle_request;