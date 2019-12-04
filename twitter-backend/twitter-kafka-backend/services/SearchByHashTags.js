const database = require('../Database.js');
const Profile = database.Profile;
const mongoose=require('mongoose')

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside SearchByHashTags, msg: ", msg);
    
    Profile.find(
        {"tweets.tweetHash":msg.hashTag},
        {"tweets.$":1},
//  {tweets:{$elemMatch:{tweetHash:{elemMatch:{$in:[msg.hashTag]}}}}}, 
        function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> SearchByHashTags",err);
            callback(err, null);
        }else{
            // console.log("INSIDE SearchByHashTags KAFKA BACKEND",profile);
            // let bookmarkedTweets = profile.bookmarkedTweets;
            console.log('SearchByHashTags  ----------->',profile)
    //         let bookmarkedTweetsIds = [];
    //         for(let bookmark of bookmarkedTweets ){
    //             bookmarkedTweetsIds.push(mongoose.Types.ObjectId(bookmark));
    //         }
    //     console.log('Bookmarked twwed IDS are ----------->',bookmarkedTweetsIds)
    //         Profile.find({"tweets.tweetId":{$in:bookmarkedTweetsIds}},
    //              {userHandle:1,name:1,"tweets.$":1},
    //  function(err, tweets){
    //             if(err){
    //                 console.log("Error in Kafka Backend -> getAllTweets",err);
    //                 callback(err, null);
    //             }else{
    //                 console.log("INSIDE getBookmarked tweetsssssssssssssssssssss------------------------------->",tweets);
                    callback(null, profile);  
                }
            });
        // }
    // });

};
exports.handle_request = handle_request;