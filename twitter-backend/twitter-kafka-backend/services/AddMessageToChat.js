const database = require('../Database.js');
const Chat = database.Chat;
const Message = database.Message;

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside AddMessageToChat kafka backend, msg: ", msg);
    let {chatId, senderId, receiverId, newMessage } = msg;
    Chat.findById({_id:chatId}, function(err, chat){
        if(err){
            console.log("Error in Kafka Backend -> addMessageToChat");
            callback(err, null);
        }else{
            let message = new Message({
                message : newMessage,
                senderId : senderId,
                receiverId : receiverId
            });
            chat.messages.push(message);
            chat.save(function(err,addedMessage){
                if(err){
                    console.log("Error in kafka backend /addMessageToChat. New message not added");
                    callback(err, null);
                }else{
                    console.log("Added new chat message to the chat.");
                    callback(null, addedMessage);
                }
            });
        }
    });

};
exports.handle_request = handle_request;
