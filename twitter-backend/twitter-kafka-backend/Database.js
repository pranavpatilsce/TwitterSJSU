let mongoose = require('mongoose');

const connectionString='mongodb+srv://root:root@cluster0-9j3qi.mongodb.net/twittertest?retryWrites=true&w=majority'
mongoose.connect(connectionString,{  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>console.log("Database connection success"))
.catch(err=>{
	console.error("Database connection error")
})
// Email, Pwd, Name, Bio, Location, Website,
//  BirthDate, ProfileImage, CoverImage, Tweets(Array), Followers(Array),
//  Following(Array), BookmarkedTweets (Array), Messages (Array)
  
var profileSchema = new mongoose.Schema({
	name: String,
	birthDate: String,
	email: String,
	password: String,
	bio: String,
	location: String,
	website: String,
	profileImage:String,
	coverImage:String,
	tweets:Array,
	followers:Array,
	following:Array,
	bookmarkedTweets:Array,
	chats:Array,
	likedTweets: Array,
	userHandle: String

})
var profileModel = mongoose.model('profile', profileSchema);
////////////////////////////////////////////////////////////////////////////////

const messageSchema = new mongoose.Schema(
	{
		message: String,
		senderId: mongoose.Schema.Types.ObjectId,
		receiverId: mongoose.Schema.Types.ObjectId,
		time : { type : Date, default: Date.now }
	},
	{
		time : { type : Date, default: Date.now }
	}
);

const chatSchema = new mongoose.Schema(
    {	
		users:Array,
        messages : [messageSchema]
    },
    {
		collection : 'chats',
		time : { type : Date, default: Date.now }
    }
);

const chat = mongoose.model('chat', chatSchema);
const message = mongoose.model('message',messageSchema);

////////////////////////////////////////////////////////////////////////////////

var tweetHashSchema = new mongoose.Schema({
    hashData:[]
})
var tweetHashModel = mongoose.model('tweethash', tweetHashSchema);

module.exports = {
  Profile:profileModel,
  Chat: chat,
  Message :message,
  TweetHash:tweetHashModel

}