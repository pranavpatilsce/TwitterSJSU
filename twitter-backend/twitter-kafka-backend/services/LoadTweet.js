var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {

    console.log("Inside Load Tweet Kafka Backend!");
    // profileModel.findById(msg.id, function (err, tweet){
    //     if(err){
    //         console.log("Error inside twitter kafka backend -> Load Tweet");
    //         callback(err, null);
    //     }
    //     else{

    //         console.log(tweet);
    //         callback(null, tweet);
    //     }

    // })

    profileModel.updateOne({ tweets: { $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) } } },
        {
            $inc: {
                "tweets.$.views": 1
            }
        },
        function (err, user) {

            if (err) {
                console.log('error-->');
                callback(err, "Error");
            }


            else {

                console.log(user);
                profileModel.find({ tweets: { $elemMatch: { tweetId: mongoose.Types.ObjectId(msg.tweetId) } } },{_id: 0, 'tweets.$': 1}
                , function(err, tweets){
                    if(err){
                        console.log("Error in Kafka Backend -> getAllTweets");
                        callback(err, null);
                    }else{
                        console.log("INSIDE Load  tweetsssssssssssssssssssss------------------------------->",tweets)
                        callback(null, tweets);  
                    }
                });
            }
        }
    )

};
exports.handle_request = handle_request;