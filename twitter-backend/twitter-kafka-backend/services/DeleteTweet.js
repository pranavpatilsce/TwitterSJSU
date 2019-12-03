var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {
    profileModel.updateOne({ userHandle: msg.userHandle },
        {$pull:{tweets:{tweetId:  mongoose.Types.ObjectId(msg.tweetId)}}},
        function (error, results) {
            if (error) {
                console.log("error in Kafka DELETE Tweet results ", error);
                callback(error, "Error")
            }
            else {
                console.log("kafka deleteTweet result ",results);
                callback(null, results);
            };
        });

};
exports.handle_request = handle_request;