var express = require('express');
var router = express.Router();
var passport = require("passport");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const kafka = require("../kafka/kafka/client");
const saltRounds = 10;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profileImages/')
    },
    filename: function (req, file, cb) {
        // console.log(JSON.parse(req.cookies.getItemDetails).itemId)
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });
router.post("/upload", upload.single('productImage'), (req, res, next) => {
    console.log(req.body);
    req.body.image = req.file.filename;
    kafka.make_request('uploadImage', req.body, function (error, results) {
        if (error) {
            console.log("error in results--------", results);
            throw error;
        }
        else {
            console.log("Updated Image ",results)
            res.status(202).send();
        }
    });
})

//Add Profile
router.post('/addProfile',  function (req, res, next) {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        req.body.hash = hash;
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
});

router.post('/signInProfile', function (req, res, next) {
    kafka.make_request('signInProfile', req.body, function (error, results) {
        if (error) {
            console.log("not compare working-------------------");
            data = {
                error: "Invalid login credentials"
            };
            output = "Invalid login credentials";
            res.status(200).send(JSON.parse(data));
           
        }
        else {
            console.log("COMPARE working-------------------")
            output = "SuccessFull Login";
            profile = results[0];

            // const token = jwt.sign({ _id: results[0]._id }, "cmpe273");
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            // res.header('Authorization', "token " + token)
            res.send(profile);
        }
    });
});

router.post('/updateProfile',  function (req, res, next) {
    kafka.make_request('update_profile',req.body, function(error,results){
       if (error) {
           console.log("error in results ");
           res.status(200).send(error)
       }
       else {
           res.status(200).send(results);
       };
   });
});

router.post('/getProfile',  function (req, res, next) {
    kafka.make_request('get_profile',req.body, function(error,results){
       if (error) {
           console.log("error in results ");
           res.status(200).send(error)
       }
       else {
           res.status(200).send(results);
       };
   });
});

router.post('/deleteProfile',  function (req, res, next) {
    kafka.make_request('delete_profile',req.body, function(error,results){
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
