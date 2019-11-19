var database = require('./Database.js');
const Chat = database.Chat;
const Message = database.Message;
const profileModel = database.Profile;




profileModel.find({tweets: {tweetId:"5dd1f431a4b0b444c0e76a12"}},function(err,result){
    if(err){console.log(err);}
    else{
        console.log(result);
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



