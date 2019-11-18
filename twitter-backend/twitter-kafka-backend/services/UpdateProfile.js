var db = require('../Database');
var profileModel = db.Profile;
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
                callback(null, results);
            };
        });

};
exports.handle_request = handle_request;