const database = require('../Database.js');
const Chat = database.Chat;


function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside getAllChats kafka backend, msg: ", typeof(msg) );
    callback(null, success);
//    let chatIds = msg.split(',');
//     console.log("-------",chatIds,"---------------------------------------------------");
//     Chat.find( {_id: {$in:chatIds}}, function(err, chats){
//         if(err){
//             console.log("Error in Kafka Backend -> GetAllChat");
//             callback(err, null);
//         }else{
//             console.log("Sending All chats to backend from kafka backend");
//             callback(null, chats);
//         }
//     })

};

exports.handle_request = handle_request;