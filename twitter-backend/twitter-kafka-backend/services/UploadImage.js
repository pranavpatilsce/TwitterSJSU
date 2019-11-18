var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');

function handle_request(msg, callback) {
    profileModel.update(
        {
            _id: msg._id
        },
        {
            "$set": {
                profileImage: msg.profileImage,
                coverImage: msg.coverImage
            }
        }
        , function (error, results) {
            if (error) {
                console.log("error in results ", error);
                callback(error, "Error")
            }
            else {
                console.log(results);
                // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                callback(null, results);
            };
        });

};
exports.handle_request = handle_request;