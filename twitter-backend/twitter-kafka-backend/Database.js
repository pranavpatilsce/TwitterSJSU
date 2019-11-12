let mongoose = require('mongoose');

const connectionString='mongodb+srv://root:root@cluster0-9j3qi.mongodb.net/twitter?retryWrites=true&w=majority'
class Database {
  constructor() {
    this._connect()
  }

  // Email, Pwd, Name, Bio, Location, Website,
  //  BirthDate, ProfileImage, CoverImage, Tweets(Array), Followers(Array),
  //  Following(Array), BookmarkedTweets (Array), Messages (Array)
  
_connect() {
     mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} )
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
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
    messages:Array
})
var profileModel = mongoose.model('profile', profileSchema, 'profile');


module.exports = new Database()