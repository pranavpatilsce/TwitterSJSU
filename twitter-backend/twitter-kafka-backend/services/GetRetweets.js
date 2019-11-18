const database = require('../Database.js');
const Profile = database.Profile;

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getRetweets kafka backend, msg: ", msg);
    
    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getTweets");
            callback(err, null);
        }else{
            console.log("INSIDE getTweets KAFKA BACKEND");
            let retweets =[];

            for(let tweet of profile.tweets){
                if (tweet.type == "Retweet"){
                    retweets.push(tweet);
                }
            }
            callback(null, retweets);  
        }
    });

};
exports.handle_request = handle_request;