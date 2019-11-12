var db = require('../Database');
var profileModel = db.profileModel;
var mongoose = require('mongoose');

function handle_request(msg, callback) {
    profileModel.find({ email: msg.email }, function (err, results) {
        if (results.length > 0) {
            console.log("email id exists");
            callback(err, "Email Id already exists!");

        }
    });
    console.log("msg----", msg)
    var insertProfile = new profileModel({
        name: msg.name,
        birthDate: msg.birthDate,
        email: msg.email,
        password: msg.password,
        bio: msg.bio,
        location: msg.location,
        website: msg.website,
        profileImage: msg.profileImage,
        coverImage: msg.coverImage,
        tweets: msg.tweets,
        followers: msg.followers,
        following: msg.following,
        bookmarkedTweets: msg.bookmarkedTweets,
        messages: msg.messages
    })
    insertProfile.save(function (error, results) {
        if (error) {
            console.log("error in results ", error);
            callback(error, "Error")
        }
        else {
            console.log("result in kafka",results);
            callback(null, results);
        };
    });


};
exports.handle_request = handle_request;