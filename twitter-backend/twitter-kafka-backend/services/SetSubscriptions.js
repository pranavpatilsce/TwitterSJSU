var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');


function handle_request(msg, callback) {

    console.log("Inside set subscriptions msg----", msg)
    profileModel.updateMany(
        {_id:msg.id},
        {$push:{
            subscriptions:{
                listId:msg.listId
               
      }}},function(err,doc){ 
          if (err) {
          console.log('error-->');
          callback(err,"Error");
      }else{
          callback(null, {success:true});
      }})
};
exports.handle_request = handle_request;