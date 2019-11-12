let mongoose = require('mongoose');

const connectionString='mongodb+srv://root:root@cluster0-9j3qi.mongodb.net/twitter?retryWrites=true&w=majority'
mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} );
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
    chats:Array
})
var profileModel = mongoose.model('profile', profileSchema);


module.exports = {
  Profile:profileModel
}