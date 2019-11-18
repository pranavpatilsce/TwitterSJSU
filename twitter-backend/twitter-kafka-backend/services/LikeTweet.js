var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

console.log("Inside like tweet msg----", msg)

profileModel.updateOne({_id:msg._id,"tweets.tweetId": {$eq:mongoose.Types.ObjectId(msg.tweetId)}},{
"$set":{
    $inc:{"tweet.$.likes":1},
    $push:{"tweets.$.likedBy":msg.likedBy}}}
// profileModel.find({_id:msg._id,"tweets.tweetId": {$eq:mongoose.Types.ObjectId(msg.tweetId)}}
,function(err, user) {

    if(err)
    {
        console.log('error-->');
        callback(err,"Error");
    }

    else{console.log('Result',user)
        callback(null, {success:true});
    }

})

    // profileModel.update({_id:msg.id}, { $push: { tweets:  {
    //     tweetId: new mongoose.Types.ObjectId(),
    //     tweet: msg.tweet,
    //     time: msg.time,
    //     date: msg.date,
    //     retweets: 0,
    //     replies:[],
    //     likes:0,
    //     likesUsers:[],
    //     tweetHash:matches

    // }}}, {upsert: true}, function(err, docs){
    //     if (err) {
    //       console.log('error-->');
    //       callback(err,"Error");
    //   }
    //   else{
    //     callback(null, {success:true});
    //   }
    //     });
};
exports.handle_request = handle_request;