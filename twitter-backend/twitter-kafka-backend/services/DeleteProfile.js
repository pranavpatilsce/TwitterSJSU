var db = require('../Database');
var profileModel = db.Profile;
// var mongoose = require('mongoose');

function handle_request(msg, callback) {
    profileModel.remove({ _id: msg._id },
        function (error, results) {
            if (error) {
                console.log("error in Kafka DELETEProfile results ", error);
                callback(error, "Error")
            }
            else {
                console.log("kafka deleteProfile result ",results);
                callback(null, results);
            };
        });

};
exports.handle_request = handle_request;