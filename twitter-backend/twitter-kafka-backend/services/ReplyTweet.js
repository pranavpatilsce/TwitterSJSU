var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

console.log("Inside reply tweet msg----", msg)

let replyObj = {
    userHandle:msg.userHandle,
    reply:msg.reply
}
profileModel.updateOne({tweets: { $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) }} },
{
   
    $push:{
        "tweets.$.replies": replyObj
    }
},
function (err, user) {

    if (err) {
        console.log('error-->');
        callback(err, "Error");
    }

    else {
        console.log('Result', user)
        callback(null, { success: true });
    }

})


};
exports.handle_request = handle_request;