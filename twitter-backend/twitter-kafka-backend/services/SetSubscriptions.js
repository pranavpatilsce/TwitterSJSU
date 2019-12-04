var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');


function handle_request(msg, callback) {

    profileModel.find({_id:msg.id, subscriptions:{$elemMatch:{listId:mongoose.Types.ObjectId(msg.listId)}}},{"subscriptions.$.listId":1},function(errorr,output){
        if(errorr){
            console.log("errorrr")
            callback()
        }else{
            if(output.length>0){
            console.log("rukna chahiye",output)
            callback(null,"exists");
            }else{
                console.log("chalna chahiye",output)
          

    console.log("Inside set subscriptions msg----", msg)
    profileModel.find({userHandle: msg.userHandle,
        //  lists:{$elemMatch:{listId:mongoose.Types.ObjectId(msg.listId)}}
        },
        {lists:{$elemMatch:{listId:mongoose.Types.ObjectId(msg.listId)}}, userHandle:1,name:1},
        function(error,res){
        if(error){
            callback(error,"Error in Finding")
        }else{
            console.log("list data found is: ",res[0].lists[0])
    profileModel.updateOne(
        {_id:msg.id},
        {$push:{
            subscriptions:{
                ownerUserHandle:res[0].userHandle,
                ownerName:res[0].name,
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
}

}
})
};
exports.handle_request = handle_request;