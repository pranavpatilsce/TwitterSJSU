var db = require('../Database');
var profileModel = db.Profile;
var mongoose = require('mongoose');
// var express = require('express');
// var router = express.Router();
const pool = require('../db');

function handle_request(msg, callback) {

    


    console.log("Inside Add Profile msg----", msg)
    profileModel.find({ email: msg.email }, function (err, results) {
        if (results.length > 0) {
            console.log("email id exists");
            callback(err, "Email Id already exists!");

        }
    });
    

    var insertProfile = new profileModel({
        name: msg.name,
        birthDate: msg.birthDate,
        email: msg.email,
        password: msg.hash,
        bio: msg.bio,
        location: msg.location,
        userHandle: msg.userHandle,
        profileImage: msg.profileImage,
        coverImage: msg.coverImage,
        tweets: msg.tweets,
        followers: msg.followers,
        following: msg.following,
        bookmarkedTweets: msg.bookmarkedTweets,
        messages: msg.messages
    })

    
    insertProfile.save(function (error, results) {
        if (error) {
            console.log("error in results ", error);
            callback(error, "Error")
        }
        else {
            console.log("result in kafka",results);

            pool.getConnection(function (error, conn) {

                // pool.query(`Select * from userprofile where email=${msg.email}`, function (error, result) {
                //     if (result.length>0) {
                //         console.log("email id exists in SQL")
                //         // res.cookie('cookie', "error", { maxAge: 900000, httpOnly: false, path: '/' });
                //         // res.status(200).send("Email Id already exists!");
                //         // res.end();
                //     }
                // });
                var insertSignUp = `Insert into userprofile 
                (name,mongo_id, email, password, bio, location, userhandle, birthdate,coverimage) Values 
                ('${msg.name}' ,'${results._id}','${msg.email}' ,'${msg.hash}','${msg.bio}',
                '${msg.location}','${msg.userHandle}','${msg.birthDate}','${msg.coverImage}')`;
        
                pool.query(insertSignUp, function (error, result) {
                    if (error) {
                        console.log("error in SQL",error)
                        // res.cookie('cookie', "error", { maxAge: 900000, httpOnly: false, path: '/' });
                        // res.status(200).send("error in SQL");
                        // res.end();
                    }
                    else {
                        console.log("done");
                        // res.status(201).send("Added Successfully");
                    }
                });
            });
            callback(null, results);
        };
    });


};
exports.handle_request = handle_request;