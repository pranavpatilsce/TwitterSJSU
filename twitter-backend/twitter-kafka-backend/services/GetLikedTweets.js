const database = require('../Database.js');
const Profile = database.Profile;
const mongoose= require('mongoose')

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getLikedtweets kafka backend, msg: ", msg);
    
    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getLikedtweets");
            callback(err, null);
        }else{
            console.log("INSIDE getLikedtweets KAFKA BACKEND");
           let likedTweets = profile.likedTweets;
           callback(null, likedTweets); 
        }
    });

};
exports.handle_request = handle_request;