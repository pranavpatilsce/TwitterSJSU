var express = require('express');
var router = express.Router();
var passport = require("passport");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const kafka = require("../kafka/kafka/client");

//Search Item from buyer page
router.post('/addProfile',  function (req, res, next) {
     kafka.make_request('add_profile',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.cookie('section', results, { maxAge: 900000, httpOnly: false, path: '/' });
            res.status(200).send(results);
        };
    });
});

router.post('/signInProfile', function (req, res, next) {
    kafka.make_request('signInProfile', req.body, function (error, results) {
        if (results) {
            console.log("COMPARE working-------------------")
            output = "SuccessFull Login";
            profile = JSON.stringify(results[0]);

            // const token = jwt.sign({ _id: results[0]._id }, "cmpe273");
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            // res.header('Authorization', "token " + token)
            res.send(profile);
        }
        else {
            console.log("not compare working-------------------");
            data = {
                error: "Invalid login credentials"
            };
            output = "Invalid login credentials";
            res.status(200).send(data);
        }
    });
});

module.exports = router;
