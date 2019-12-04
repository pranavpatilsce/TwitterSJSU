var express = require('express');
var router = express.Router();
var passport = require("passport");
const kafka = require("../kafka/kafka/client");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/tweetImages/')
    },
    filename: function (req, file, cb) {
        // console.log(JSON.parse(req.cookies.getItemDetails).itemId)
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

//Bookmark the tweet
router.post('/bookmark',  function (req, res, next) {
    console.log('Inside bookmark kafka.');
     kafka.make_request('bookmark',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            console.log("Tweet BookMarked!!!");
            res.status(200).send({response:true});
        };
    });
});

//Post Tweets
router.post('/tweet', upload.single('tweetimg'), function (req, res, next) {
    console.log('Inside create tweet kafka.------------------------------------>',JSON.stringify(req.body.reqdata));

    // const tweet = new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     profileImg: url + '/public/tweetImages' + req.file.filename
    // });

    let data = {tweet: req.body.tweet, id: req.body.id, name: req.body.name,userHandle: req.body.userHandle,image:req.file.filename};
    console.log('Tweet going for creation!!',data)
     kafka.make_request('tweet',data, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Like Tweets
router.post('/tweet/like',  function (req, res, next) {
    console.log('Inside like tweet kafka.');
     kafka.make_request('likeTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//load Tweets
router.post('/tweet/loadTweet',  function (req, res, next) {
    console.log('Inside load tweet kafka.');
     kafka.make_request('loadTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send(results);
        };
    });
});
//Reply Tweet
router.post('/tweet/reply',  function (req, res, next) {
    console.log('Inside reply tweet kafka.');
     kafka.make_request('replyTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Retweet Tweet
router.post('/tweet/retweet',  function (req, res, next) {
    console.log('Inside retweet tweet kafka.');
     kafka.make_request('retweetTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});


//Add Followers
//Retweet Tweet
router.post('/addFollowers',  function (req, res, next) {
    console.log('Inside add Followers');
     kafka.make_request('addFollowers',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Unfollow
//Retweet Tweet
router.post('/unfollow',  function (req, res, next) {
    console.log('Inside unfollow');
     kafka.make_request('unfollow',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Delete
//Delete Tweet
router.post('/deleteTweet',  function (req, res, next) {
    console.log('Inside deleteTweet');
     kafka.make_request('deleteTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//SearchByHashTags
router.post('/SearchByHashTags',  function (req, res, next) {
    console.log('Inside SearchByHashTags');
     kafka.make_request('searchByHashTags',req.body, function(error,results){
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
