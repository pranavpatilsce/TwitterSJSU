var express = require('express');
var router = express.Router();
const kafka = require("../kafka/kafka/client");

//Bookmark the tweet
router.post('/createList',  function (req, res, next) {
    console.log('Inside createList kafka.');
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

module.exports = router;