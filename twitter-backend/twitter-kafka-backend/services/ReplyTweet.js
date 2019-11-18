var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

console.log("Inside reply tweet msg----", msg)

// profileModel.updateOne({_id:msg._id,tweets:{$elemMatch:{tweetId: {$eq: mongoose.Types.ObjectId(msg.tweetId)}}}},
// {
// "$set":{
//     $inc:{"tweet.$.likes":1},
//     $push:{"tweets.$.likedBy":msg.likedBy}}},
//     {
//     tweets:{$elemMatch:{tweetId: {$eq: mongoose.Types.ObjectId(msg.tweetId)}}}}
// // profileModel.find({_id:msg._id,"tweets.tweetId": {$eq:mongoose.Types.ObjectId(msg.tweetId)}}
// ,function(err, user) {

//     if(err)
//     {
//         console.log('error-->');
//         callback(err,"Error");
//     }

//     else{console.log('Result',user)
//         callback(null, {success:true});
//     }

// })

profileModel.find({"_id":msg.id}, function(err, user) {

    if(err)
    {
        console.log('error-->');
        callback(err,"Error");
    }


    else{
        console.log("Result "+typeof user)
        user.tweets.forEach(tweet => {
            if(tweet.tweetId==msg.tweetId)
            {
                let replyObj = {
                    userHandle:msg.userHandle,
                    reply:msg.reply
                }
                tweet.reply.add(replyObj)
            }
        });

        profileModel.findOneAndUpdate(
            {$and:[{"_id":msg.id},{"tweets":{$elemMatch:  {tweetId:msg.tweetId}}}]},
                { 
                    "$set": {
                        "tweets.$": user.tweets
                    }
                },
                function(err,doc) {
                 if (err) {
                     console.log('error-->');
                 callback(err,"Error");
                 }
         
                 else{
                     console.log('result tweet reply')
                       callback(null, {status:true});
                   }
                
        
                }
            );

    }
})

    profileModel.find({_id:msg._id},function(err, docs){
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