var express = require('express');
var router = express.Router();
const kafka = require("../kafka/kafka/client");

//Search Item from buyer page
router.post('/createChat',  function (req, res, next) {
    let chatData = {
        senderId : req.body.senderId,
        receiverId : req.body.receiverId,
        message : req.body.message
    }
    kafka.make_request('create_chat',chatData, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(201).send(error)
        }
        else {
            
            res.status(200).send("DONEE!");
        }
    });
});

// router.post('/addProfile', passport.authenticate('jwt', { session: false }), function (req, res, next) {
//     kafka.make_request('add_profile',req.body, function(error,results){
//        if (error) {
//            console.log("error in results ");
//            res.status(200).send(error)
//        }
//        else {
//            res.cookie('section', results, { maxAge: 900000, httpOnly: false, path: '/' });
//            res.status(200).send(results);
//        };
//    });
// });

module.exports = router;
