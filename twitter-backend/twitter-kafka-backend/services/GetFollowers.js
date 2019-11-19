const database = require('../Database.js');
const Profile = database.Profile;


function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getFollowers kafka backend, msg: ", msg);
    
    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getFollowers");
            callback(err, null);
        }else{
            console.log("INSIDE GETFOLLOWERS KAFKA BACKEND");
            //callback(null, profile);
            let followers = profile.followers;
            console.log("kokokokokokokokokokoko");
            console.log(followers);
            Profile.find({_id:{$in:followers}}, function(err, allFollowers){
                if(err){callback(err,null);}
                else{
                    console.log(allFollowers);
                    callback(null,allFollowers);
                }
            })
        }
    });

};
exports.handle_request = handle_request;