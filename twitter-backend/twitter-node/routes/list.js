var express = require('express');
var router = express.Router();
const kafka = require("../kafka/kafka/client");

//Create the List
router.post('/createList',  function (req, res, next) {
    console.log('Inside createList Node.');
     kafka.make_request('createList',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//get all list
router.post('/getList',  function (req, res, next) {
    console.log('Inside getList Node.');
     kafka.make_request('getList',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send(results);
        };
    });
});

//get tweets of a particular list
router.post('/getListTweets',  function (req, res, next) {
    console.log('Inside getList Node.');
     kafka.make_request('getListTweets',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send(results);
        };
    });
});

module.exports = router;