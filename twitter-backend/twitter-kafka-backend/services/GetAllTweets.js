const database = require('../Database.js');
const Profile = database.Profile;
const mongoose=require('mongoose')

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getAllTweets kafka backend, msg: ", msg);
    
    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getAllTweets");
            callback(err, null);
        }else{
            console.log("INSIDE getAllTweets KAFKA BACKEND");
            let tweets =profile.tweets; // mongoose.Types.ObjectId(msg.tweetId)
            console.log('Profile Followers ----------->',profile)
            let profileIDS = [];
            for(let profilee of profile.followers ){
                profileIDS.push(mongoose.Types.ObjectId(profilee));
            
        }

        console.log('Profile IDS are ----------->',profileIDS)

            Profile.find({_id:{ $in: profile.following}}, function(err, profileAll){
                if(err){
                    console.log("Error in Kafka Backend -> getAllTweets");
                    callback(err, null);
                }else{
                    console.log("INSIDE getAllTweets KAFKA BACKEND get all profiles",profileAll);

                    for(let profile of profileAll ){
                        tweets.push(...profile.tweets);
                    
                }
    
        
                    callback(null, tweets);  
                }
            });

        }
    });

};
exports.handle_request = handle_request;