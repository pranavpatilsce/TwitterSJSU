
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let sqlCon = require('mysql');
const bcrypt = require('bcrypt');
const multer = require("multer");
const passport = require("passport");

var profileRouter = require('./routes/profile');
var messagesRouter = require('./routes/messages.js');
var userRouter= require('./routes/users');
var dashboardRouter = require('./routes/dashboard.js');
var list=require('./routes/list')
var member=require('./routes/member')

var passportJWT = require("passport-jwt");

const kafka = require('./kafka/kafka/client');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


const saltRounds = 10;

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
      
    }
})

const upload = multer({storage:storage})



const mongoose = require('mongoose');
const uri = "mongodb+srv://root:root@cluster0-bhnra.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true})

app.use(cookieParser());

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_grubhub',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));


app.use(bodyParser.json());

app.use(express.static(__dirname+'/uploads'));

app.get('/ping', function(req,res){
    res.writeHead(200);
    res.end("Health Check Passed!");
})

app.use(express.static('uploads'));

app.use('/profile', profileRouter);
app.use('/messages', messagesRouter);
app.use('/users', userRouter);
app.use('/dashboard',dashboardRouter);
app.use('/list',list);
app.use('/member',member);




var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'cmpe273';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    next(null,true)
//   console.log('payload received--------------------------', jwt_payload);
//   console.log('ID------------------------------', jwt_payload._id);
//   // usually this would be a database call:
//   Customer.find({ _id: jwt_payload._id }, function (err, cust) {

//     if (cust) {
//         next(null, cust);
//       } else {

//         Restaurant.find({ _id: jwt_payload._id }, function (err, rest) {
  
//             if (rest) {
//                 next(null, rest);
//               } else {
//                 next(null, false);
//               }
        
//           })
//       }

//   })

});





passport.use('jwt',strategy);




// Passport middleware
app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://3.18.112.47:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/logout',(req,res) => {
    console.log('logout success');
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        
    });

});



app.listen(3001);
console.log("Server Listening on port 3001");
// 
