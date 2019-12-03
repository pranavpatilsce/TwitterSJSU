var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');


function handle_request(msg, callback) {
//id unfollowId
    console.log("Inside unfollow msg----", msg)
    profileModel.update({_id: msg.id},
        {$pull:{following:msg.unfollowId},
    },
        function(error,res){
        if(error){
            callback(error,"Error in unfollow")
        }else{
            console.log("list data found is: ",res)
    profileModel.updateOne(
        {_id:msg.unfollowId},
        {$pull:{
            followers:msg.id
               
      }},function(err,doc){ 
          if (err) {
          console.log('error-->');
          callback(err,"Error");
      }else{
          callback(null, {success:true});
      }})
    }
    })
};
exports.handle_request = handle_request;