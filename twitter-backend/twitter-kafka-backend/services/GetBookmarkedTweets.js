const database = require('../Database.js');
const Profile = database.Profile;
const mongoose=require('mongoose')

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getBookmarkedTweets kafka backend, msg: ", msg);
    
    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getBookmarkedTweets");
            callback(err, null);
        }else{
            console.log("INSIDE getBookmarkedTweets KAFKA BACKEND");
            let bookmarkedTweets = profile.bookmarkedTweets;
            console.log('Bookmarked twwed ----------->',bookmarkedTweets)
            let bookmarkedTweetsIds = [];
            for(let bookmark of bookmarkedTweets ){
                bookmarkedTweetsIds.push(mongoose.Types.ObjectId(bookmark));
            
        }
        console.log('Bookmarked twwed IDS are ----------->',bookmarkedTweetsIds)

            Profile.find({tweets:{elemMatch:{tweetId:{ $in: bookmarkedTweetsIds}}}},{_id: 0, 'tweets.$': 1}
            , function(err, tweets){
                if(err){
                    console.log("Error in Kafka Backend -> getAllTweets");
                    callback(err, null);
                }else{
                    console.log("INSIDE getBookmarked tweetsssssssssssssssssssss------------------------------->",tweets);

                //     for(let profile of profileAll ){
                //         tweets.push(profile.tweets);
                    
                // }
    
        
                    callback(null, tweets);  
                }
            });

            callback(null, bookmarkedTweets);  
        }
    });

};
exports.handle_request = handle_request;