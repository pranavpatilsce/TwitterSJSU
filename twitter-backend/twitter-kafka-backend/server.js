var connection =  new require('./kafka/Connection');
//topics files
var Database=require('./Database');
var addPofile = require('./services/AddProfile');

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

var addBookmark = require('./services/AddBookmark')
var createTweet = require('./services/CreateTweet')
var likeTweet = require('./services/LikeTweet')
var replyTweet = require('./services/ReplyTweet')
var retweetTweet = require('./services/Retweet')

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

handleTopicRequest("add_profile",addPofile);  
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



