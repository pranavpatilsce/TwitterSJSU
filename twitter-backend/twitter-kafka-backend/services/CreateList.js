var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

const lId= new mongoose.Types.ObjectId();

function handle_request(msg, callback) {

    console.log("Inside create list msg----", msg)
    profileModel.update({_id:msg.id}, { $push: { lists:  {
        listId: lId,
        listName: msg.listName,
        description: msg.description,
        members:msg.members

    }}}, {upsert: true}, function(err, docs){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
          console.log("docs-------",docs)
          profileModel.find(
              
          )
          profileModel.updateMany(
              {userHandle:{$in:msg.members}},
              {$push:{
                  memberships:{
                      listId:lId,
                      listName: msg.listName,
                      description: msg.description,
                      members:msg.members
            }}},function(err,doc){ 
                if (err) {
                console.log('error-->');
                callback(err,"Error");
            }else{
                callback(null, {success:true});
            }})
      }
    });
};
exports.handle_request = handle_request;