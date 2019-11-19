var db = require('../Database');
var profileModel = db.Profile;
const pool = require('../db');
// var mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log("request Kafka msg ",msg)
    profileModel.updateOne({ _id: msg._id },
        {
            $set: {
                name: msg.name,
                birthDate: msg.birthDate,
                email: msg.email,
                password: msg.password,
                bio: msg.bio,
                location: msg.location,
                userHandle: msg.userHandle,
                profileImage: msg.profileImage,
                coverImage: msg.coverImage
            }
        },
        function (error, results) {
            if (error) {
                console.log("error in Kafka Update Profile results ", error);
                callback(error, "Error")
            }
            else {
                console.log("Kafka Update Profile result ",results);
                
                
                let pass = `UPDATE userprofile
                SET
                location = '${msg.location}',
                email = '${msg.email}',
                birthdate='${msg.birthDate}',
                name = '${msg.name}',
                bio = '${msg.bio}',
                userhandle = '${msg.userHandle}',
                coverimage =  '${msg.coverImage}'
            WHERE mongo_id = '${msg._id}'`;
    let output = "Not Updated";
    pool.query(pass, function (error, result) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            //console.log('Body Content', req.body.password);
            console.log("sql update done",result);
            // output = pool.query(`Select * from buyer where buyerId='${req.body.buyerId}'`, (update,result) => {
                // buyer = JSON.stringify(result[0]);
                // res.cookie('buyer', buyer, { encode: String });
                // res.status(200).send(result[0]);
        }
            });
        
    // });




                callback(null, results);
            };
        });

};
exports.handle_request = handle_request;