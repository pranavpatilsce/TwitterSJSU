var db = require('../Database');
var profileModel = db.Profile;
const pool = require('../db');
// var mongoose = require('mongoose');

function handle_request(msg, callback) {
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


                callback(null, results);
            };
        });

};
exports.handle_request = handle_request;