var express = require('express');
var router = express.Router();
const kafka = require("../kafka/kafka/client");

// get Followers of a given user
router.get('/getFollowers/:userId',  function (req, res, next) {
    
    let userId = req.params.userId;
    console.log("Inside /getFollowers. User ID is: ",userId);

    kafka.make_request('get_followerss',userId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getFollowers results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// get users followed by the given user
router.get('/getFollowing/:userId',  function (req, res, next) {
    
    let userId = req.params.userId;
    console.log("Inside /getFollowing. User ID is: ",userId);

    kafka.make_request('get_following',userId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getFollowing results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// get bookmarked tweets by the user
router.get('/getBookmarkedTweets/:userId',  function (req, res, next) {
    let userId = req.params.userId;
    console.log("Inside /getFollowing. User ID is: ",userId);
    kafka.make_request('get_bookmarked_tweets',userId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getBookmarkedTweets results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// get all tweets by the user
router.get('/getTweets/:userId',  function (req, res, next) {
    let userId = req.params.userId;
    console.log("Inside /getTweets. User ID is: ",userId);
    kafka.make_request('get_tweets',userId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getTweets results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// get all Retweets by the user
router.get('/getRetweets/:userId',  function (req, res, next) {
    let userId = req.params.userId;
    console.log("Inside /getRetweets. User ID is: ",userId);
    kafka.make_request('get_retweets',userId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getRetweets results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});

// get all Retweets by the user
router.get('/getLikedTweets/:userId',  function (req, res, next) {
    let userId = req.params.userId;
    console.log("Inside /getLikedTweets. User ID is: ",userId);
    kafka.make_request('get_liked_tweets',userId, function(error,kafkaResult){
        if (error) {
            console.log("error in /getLikedTweets results ");
            res.status(201).send(error)
        }
        else {
            res.writeHead(200);
            res.end(JSON.stringify(kafkaResult));
        }
    });
});
module.exports = router;
