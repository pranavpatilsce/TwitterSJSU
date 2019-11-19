const database = require('../Database.js');
const Profile = database.Profile;


function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getFollowing kafka backend, msg: ", msg);
    
    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getFollowers");
            callback(err, null);
        }else{
            console.log("INSIDE GETFOLLOWING KAFKA BACKEND");
            let following = profile.following;

            Profile.find({_id:{$in:following}}, function(err, allFollowing){
                if(err){
                    console.log("Error in Kafka Backend -> getFollowing");
                    callback(err,null);
                }else{
                    callback(null, allFollowing);
                }
            });
        }
    });

};
exports.handle_request = handle_request;