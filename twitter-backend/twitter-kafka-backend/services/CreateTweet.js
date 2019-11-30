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
console.log('Matches is',matches);
    profileModel.update({_id:msg.id}, { $push: { tweets:  {
        tweetId: new mongoose.Types.ObjectId(),
        tweet: msg.tweet,
        time: msg.time,
        date: msg.date,
        retweets: 0,
        replies:[],
        likes:0,
        tweetHash:matches,
        likedBy:[]

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