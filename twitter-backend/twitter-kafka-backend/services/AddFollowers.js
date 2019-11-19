var db = require('../Database');
var profileModel = db.Profile;

function handle_request(msg, callback) {
    console.log("Inside add followers msg----", msg)

profileModel.update({_id:msg.initiateId}, { $push: { following: msg.tobeFollowedID}}, {upsert: true}, function(err, docs){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
          console.log('Results of first update!!!',docs)
        profileModel.update({_id:msg.tobeFollowedID}, { $push: { followers: msg.initiateId}}, {upsert: true}, function(err, docs){
            if (err) {
              console.log('error-->');
              callback(err,"Error");
          }
          else{
            callback(null, {success:true});
          }
            });
      }
        });
};
exports.handle_request = handle_request;