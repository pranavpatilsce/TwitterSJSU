const database = require('../Database.js');
const Chat = database.Chat;
const Message = database.Message;
const profileModel = database.Profile;

function handle_request(msg, callback) {
    console.log("**********************");
    console.log("Inside createChat, msg: ", msg);
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
                    console.log("Added the first message to the chat. DONE!!");
                    console.log("**********************");
                    //callback(null, true);
                    //saveChatInUserProfiles(updatedChat.users, updatedChat._id,()=>{});
                    profileModel.updateMany( {_id:{$in:createdChat.users}}, {$push: {chats:updatedChat._id}}, {upsert: true}, function(err, result){
                        if(err){
                            console.log("INSIDE ERROR OF PROFILE UPDATE - CREATE CHAT");
                            callback(err,null);
                        }
                        else{
                            console.log( "INSIDE SUCCESS OF PROFILE UPDATE - CREATE CHAT");
                            callback(null, updatedChat);
                        }
                    })
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
};
exports.handle_request = handle_request;