var database = require('./Database.js');
const Chat = database.Chat;
const Message = database.Message;
const profileModel = database.Profile;
// let msg = new Message({
//     message : "Hellooo",
//     senderId : 1234,
//     receiverId : 43124
// })

// let chat = {
//     users:[1234,43124]
// }
// Chat.create(chat, function(err, result){
//     if(err){
//         console.log(err);
//     }else{
//         result.messages.push(msg);
//         result.save(function(err, result2){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(result2);
//             }
//         })
//         //console.log(result);
//     }
// })

// let msg = {
//     senderId:"5dca4220beab640fd4d7ed6f",
//     receiverId: "5dca6e861c9d44000093c179",
//     message : "OKOKOKO"
// }
let chat = new Chat({
    users: [msg.senderId, msg.receiverId]
});

let message = new Message({
    message : msg.message,
    senderId : msg.senderId,
    receiverId : msg.receiverId
})

chat.save( function(err, createdChat){
    if(err){
        console.log("Error creating a chat at Kafka Backend");
        callback(err, null);
    }
    else{
        console.log("New chat created successfully. Adding message now!");
        createdChat.messages.push(message);
        createdChat.save( function(err,updatedChat){
            if(err){
                console.log("Error adding a new message to chat at kafka backend");
                callback(err,null);
            }
            else{
                console.log("Added the first message to the chat. Saving in user profiles");
                saveChatInUserProfiles(updatedChat.users, updatedChat._id,()=>{});
            }
        })
    }
});

// function saveChatInUserProfiles(users,chatId,callback){
//     if(users.length == 2){
//         profileModel.findById(users[0],function(err,user1){
//             if(err){console.log("Error in finding Sender's profile");callback(err,null);}
//             else{
//                 user1.chats.push(chatId);
//                 user1.save(function(err, savedUser1){
//                     if(err){console.log("Error in adding chat to sender's profile");callback(err,null);}
//                     else{
//                         profileModel.findById(users[1],function(err,user2){
//                             if(err){console.log("Error in finding Receiver's profile");callback(err, null);}
//                             else{
//                                 user2.chats.push(chatId);
//                                 user2.save(function(err, savedUser2){
//                                     if(err){console.log("Error in adding chat to receiver's profile");callback(err, null);}
//                                     else{
//                                         console.log("Chat added to both users profile");
//                                         callback(null,true);
//                                     }
//                                 });
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
//     else{
//         console.log("No users");
//     }
// }