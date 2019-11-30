var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log("Inside Bookmark msg----", msg)

    profileModel.update({_id:msg.id}, { $push: { bookmarkedTweets: msg.tweet_id  } }, {upsert: true}, function(err, docs){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
          callback(null, {success:true});
      }
        });

};
exports.handle_request = handle_request;