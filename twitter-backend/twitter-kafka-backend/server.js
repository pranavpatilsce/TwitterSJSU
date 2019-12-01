var connection =  new require('./kafka/Connection');

//topics files
var Database=require('./Database');
//var RedisClient = require('./Redis')
var AddProfile = require('./services/AddProfile.js');
var SignInProfile=require('./services/SignInProfile');
var UpdateProfile= require('./services/UpdateProfile');
var GetProfile= require('./services/GetProfile');
var DeleteProfile=require('./services/DeleteProfile');
var UploadImage= require('./services/UploadImage');
var GetProfileKafka= require('./services/GetProfileKafka');

// Messages
var CreateChat = require('./services/CreateChat.js');
var GetChat = require('./services/GetChat.js');
var AddMessageToChat = require('./services/AddMessageToChat.js');

//Dashboard
var GetFollowers = require('./services/GetFollowers.js');
var GetFollowing = require('./services/GetFollowing.js');
var GetBookmarkedTweets = require('./services/GetBookmarkedTweets.js');
var GetTweets = require('./services/GetTweets.js');         
var GetRetweets = require('./services/GetRetweets.js');     
var GetLikedTweets = require('./services/GetLikedTweets.js');    


//Tweet
var addBookmark = require('./services/AddBookmark')
var createTweet = require('./services/CreateTweet')
var likeTweet = require('./services/LikeTweet')
var replyTweet = require('./services/ReplyTweet')
var retweetTweet = require('./services/Retweet')
var addFollowers = require('./services/AddFollowers')

//List
var CreateList= require('./services/CreateList');
var GetList= require('./services/GetList');
var GetListTweets= require('./services/GetListTweets');


function handleTopicRequest(topic_name,fname){ 
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    })
                    //partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log("here",data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request

handleTopicRequest("add_profile",AddProfile)
handleTopicRequest("signInProfile",SignInProfile)
handleTopicRequest("update_profile",UpdateProfile)
handleTopicRequest("get_profile",GetProfile)
handleTopicRequest("delete_profile",DeleteProfile)
handleTopicRequest("uploadImage",UploadImage)
handleTopicRequest("create_chat",CreateChat);
handleTopicRequest("get_chat",GetChat);
handleTopicRequest("add_message_to_chat",AddMessageToChat);
handleTopicRequest("get_followerss", GetFollowers);
handleTopicRequest("get_following", GetFollowing);
handleTopicRequest("get_bookmarked_tweets",GetBookmarkedTweets);
handleTopicRequest("get_tweets", GetTweets);
handleTopicRequest("get_retweets", GetRetweets);
handleTopicRequest("get_liked_tweets", GetLikedTweets);
handleTopicRequest("bookmark",addBookmark);
handleTopicRequest("tweet",createTweet);
handleTopicRequest("likeTweet",likeTweet) 
handleTopicRequest("replyTweet",replyTweet) 
handleTopicRequest("retweetTweet",retweetTweet) 
handleTopicRequest("addFollowers",addFollowers) 
handleTopicRequest("getProfileKafka",GetProfileKafka)
handleTopicRequest("createList",CreateList)
handleTopicRequest("getList",GetList)
handleTopicRequest("getListTweets",GetListTweets)

