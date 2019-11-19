const database = require('../Database.js');
const Chat = database.Chat;


function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getChat kafka backend, msg: ", msg);
    
    Chat.findById({_id:msg}, function(err, chat){
        if(err){
            console.log("Error in Kafka Backend -> GetChat");
            callback(err, null);
        }else{
            console.log("Sending chat to backend from kafka backend");
            callback(null, chat);
        }
    });

};
exports.handle_request = handle_request;