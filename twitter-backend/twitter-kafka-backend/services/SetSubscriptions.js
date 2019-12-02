var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');


function handle_request(msg, callback) {

    console.log("Inside set subscriptions msg----", msg)
    profileModel.find({userHandle: msg.userHandle,
        //  lists:{$elemMatch:{listId:mongoose.Types.ObjectId(msg.listId)}}
        },
        {lists:{$elemMatch:{listId:mongoose.Types.ObjectId(msg.listId)}}},
        function(error,res){
        if(error){
            callback(error,"Error in Finding")
        }else{
            console.log("list data found is: ",res[0].lists[0])
    profileModel.updateOne(
        {_id:msg.id},
        {$push:{
            subscriptions:{
                listId:res[0].lists[0].listId,
                listName: res[0].lists[0].listName,
                description: res[0].lists[0].description,
                members:res[0].lists[0].members
               
      }}},function(err,doc){ 
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