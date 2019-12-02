const database = require('../Database.js');
// const redis = require('../Redis.js');
const Profile = database.Profile;

// const client = redis.Client;

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getFollowers kafka backend, msg: ", msg);



    const getFollowers = 'user:followers';

    // // Try fetching the result from Redis first in case we have it cached
    // return client.get(getFollowers, (err, followers) => {
    
    //    // If that key exists in Redis store
    //    if (followers) {
   
    //        //return res.json({ source: 'cache', data: JSON.parse(photos) })
    //                    console.log('Data Returned from Redis GetFollowers@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',followers);
    //                    callback(null,followers);
    //    } else {
    //     console.log('Data Not found in  Redis GetFollowers--------------------------------------------------------------------------------------');
  

    //    }})

    Profile.findById({_id:msg}, function(err, profile){
        if(err){
            console.log("Error in Kafka Backend -> getFollowers");
            callback(err, null);
        }else{
            console.log("INSIDE GETFOLLOWERS KAFKA BACKEND");
            //callback(null, profile);
            let followers = profile.followers;
            // console.log("kokokokokokokokokokoko");
            console.log(followers);
            Profile.find({_id:{$in:followers}}, function(err, allFollowers){
                if(err){callback(err,null);}
                else{
                // // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
                // client.setex(getFollowers, 3600, allFollowers)
                    console.log(allFollowers);
                    callback(null,allFollowers);
                }
            })
        }
    });



};
exports.handle_request = handle_request;