var express = require('express');
var router = express.Router();
const kafka = require("../kafka/kafka/client");

//Create the List
router.post('/getMemberships',  function (req, res, next) {
    console.log('Inside getMemberships Node.');
     kafka.make_request('getMemberships',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send(results);
        };
    });
});

//Create the List
router.post('/getSubscriptions',  function (req, res, next) {
    console.log('Inside getMemberships Node.');
     kafka.make_request('getSubscriptions',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send(results);
        };
    });
});

//Create the Subscription List
router.post('/setSubscriptions',  function (req, res, next) {
    console.log('Inside setSubscriptions Node.');
     kafka.make_request('setSubscriptions',req.body, function(error,results){
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
