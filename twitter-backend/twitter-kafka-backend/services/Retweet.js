var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

console.log("Inside retweet tweet msg--------------------------------------------------------------------------------------------", msg)
let sentence = msg.tweet;
let re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];
while (match = re.exec(sentence)) {
  matches.push('#'+match[1]);
}
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() 
var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
if(msg.image='') msg.image='defaulttweet.jpeg'
console.log('Matches is',matches);
    profileModel.update({_id:msg.id}, { $push: { tweets:  {
        tweetId: new mongoose.Types.ObjectId(),
        tweet: msg.tweet,
        time: time,
        date: date,
        retweets: 0,
        replies:[],
        likes:0,
        tweetHash:matches,
        likedBy:[],
        type:"Retweet",
        originalTweetOwner:msg.orignalHandle,
        name:msg.name,
        userHandle:msg.userHandle,
        image:msg.image

    }}}, {upsert: true}, function(err, docs){
        if (err) {
          console.log('error-->');
          callback(err,"Error");
      }
      else{
        profileModel.updateOne({ tweets: { $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) } } },
        {
            $inc: {
                "tweets.$.retweets": 1
            }
        },function(err, docs){
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
