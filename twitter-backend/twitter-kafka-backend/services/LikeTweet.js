var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

    console.log("Inside like tweet msg----", msg)


    profileModel.updateOne({tweets: { $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) }} },
        {
            $inc: {
                "tweets.$.likes": 1
            },
            $push:{
                "tweets.$.likedBy": msg.likedBy
            }
        },
        function (err, user) {

            if (err) {
                console.log('error-->');
                callback(err, "Error");
            }


            else{
                
profileModel.find({tweets: { $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) }} },
{tweets:{ $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) }},_id:0},

function(err, tweet){
if(err)
{
    console.log('error-->');
callback(err, "Error");
}

else{
console.log('Tweet liked is',tweet[0].tweets[0])

profileModel.update({_id:msg.id}, { $push: { likedTweets:tweet[0].tweets[0]}}, {upsert: true}, function(err, docs){
    if (err) {
      console.log('error-->');
      callback(err,"Error");
  }
  else{
    callback(null, {success:true});
  }
    });


}
}


)
            }   
        }
    )};
exports.handle_request = handle_request;