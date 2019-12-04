var db = require('../Database');
var profileModel = db.Profile;
var tweetHashModel = db.tweetHashModel;
var mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log("Inside create tweet msg----", msg)

let sentence = msg.tweet;
let re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];
while (match = re.exec(sentence)) {
  matches.push('#'+match[1]);
}
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() 
var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
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
        type:"Original",
        image:msg.image,
        name:msg.name,
        userHandle:msg.userHandle,
        views:0
    }}}, {upsert: true}, function(err, docs){
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
