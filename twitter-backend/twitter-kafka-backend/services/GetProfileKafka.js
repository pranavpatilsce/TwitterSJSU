var db = require('../Database');
var profileModel = db.Profile;

function handle_request(msg, callback) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    profileModel.find({ userHandle: msg.userHandle },
        function (error, results) {
            if (error) {
                console.log("error in Kafka GetProfile results ", error);
                callback(error, "Error")
            }
            else {
                console.log("kafka getProfile result ",results);
                callback(null, results);
            };
        });
};
exports.handle_request = handle_request;