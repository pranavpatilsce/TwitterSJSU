var express = require('express');
var router = express.Router();
var passport = require("passport");
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
