var database = require('./Database.js');
const Chat = database.Chat;
const Message = database.Message;
const profileModel = database.Profile;




profileModel.findById("5dca6e861c9d44000093c179",function(err,profile){
    if(err){console.log(err);}
    else{
        //console.log(profile);
        let chats = profile.chats;
        console.log(chats)
        Chat.find({_id:{$in:chats}}, function(err,chats){
            if(err){console.log(err);}
            else{
                console.log(chats);
            }
        })

        
    }
})


// let msg = {
//     senderId:"5dca4220beab640fd4d7ed6f",
//     receiverId: "5dca6e861c9d44000093c179",
//     message : "OKOKOKO"
// }
// let chat = new Chat({
//     users: [msg.senderId, msg.receiverId]
// });

// let message = new Message({
//     message : msg.message,
//     senderId : msg.senderId,
//     receiverId : msg.receiverId
// })



