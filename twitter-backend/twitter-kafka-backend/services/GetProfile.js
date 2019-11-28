var db = require('../Database');
var profileModel = db.Profile;
const pool = require('../db');
// const redis = require('../Redis.js');

// const client = redis.Client;
// var mongoose = require('mongoose');

function handle_request(msg, callback) {

    const getProfile = 'user:getProfile';

    // Try fetching the result from Redis first in case we have it cached
    // return client.get(getProfile, (err, profileInfo) => {
    
    //    // If that key exists in Redis store
    //    if (profileInfo) {
   
    //        //return res.json({ source: 'cache', data: JSON.parse(photos) })
    //                    console.log('Data Returned from Redis GetProfile@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',profileInfo);
    //                    callback(null,profileInfo);
    //    } else {
    //     console.log('Data Not found in  Redis GetProfile--------------------------------------------------------------------------------------------------------');
 


    //    }
    
    // }
    // )

    profileModel.find({ userHandle: msg.userHandle },
        function (error, results) {
            if (error) {
                console.log("error in Kafka GetProfile results ", error);
                callback(error, "Error")
            }
            else {
                console.log("kafka getProfile result ",results);

                pool.query(`Select * from userprofile where userhandle='${msg.userHandle}'`, function (error, result) {
                    if (error) {
                        console.log("error in results ");
                        throw error;
                    }
                    else {
                        //console.log('Body Content', req.body.password);
                        console.log("sql getProfile done",result[0]);
                        // output = pool.query(`Select * from buyer where buyerId='${req.body.buyerId}'`, (update,result) => {
                            // buyer = JSON.stringify(result[0]);
                            // res.cookie('buyer', buyer, { encode: String });
                            // res.status(200).send(result[0]);
                    }
                        });

                //   // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
                // client.setex(getProfile, 3600,JSON.stringify(results))
                callback(null, results);
            };
        });
  

};
exports.handle_request = handle_request;