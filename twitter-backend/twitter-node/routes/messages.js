var express = require('express');
var router = express.Router();
const kafka = require("../kafka/kafka/client");

//Create a new chat
router.post('/createChat',  function (req, res, next) {
    let chatData = {
        senderId : req.body.senderId,
        receiverId : req.body.receiverId,
        message : req.body.message
    }
    kafka.make_request('create_chat',chatData, function(error,kafkaResult){
        if (error) {
            console.log("error in /createChat results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// Get a particular chat
router.get('/getChat/:chatId',  function (req, res, next) {
    
    let chatId = req.params.chatId;
    console.log("Inside /getChat. Chat ID is: ",chatId);

    kafka.make_request('get_chat',chatId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getChat results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// Add a new message to an existing chat
router.post('/addMessageToChat',  function (req, res, next) {
    
    let chatData = {
        chatId :req.body.chatId,
        senderId : req.body.senderId,
        receiverId : req.body.receiverId,
        newMessage : req.body.message
    }
    console.log("MESSAGE: ", chatData.newMessage);
    console.log("Inside /addMessageToChat.");
    kafka.make_request('add_message_to_chat',chatData, function(error,kafkaResult){
        if (error) {
            console.log("error in /addMessageToChat results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

module.exports = router;
