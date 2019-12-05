const database = require('../Database.js');
const Chat = database.Chat;


function handle_request(msg, callback) {
    console.log("**********************");
    callback(null, true);
    console.log("Inside getAllChats kafka backend, msg: ", typeof(msg) );
//     if(msg==null || msg=='')
//     {
//         callback(err, null);
//     }
//   let chatIds = msg.split(',');
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