const flash=require('express-flash');
const express=require('express');
const app= express();
const ejs= require('ejs');
//const bcrypt=require('bcrypt');

const path=require('path');
const expressLayouts= require('express-ejs-layouts');
const mongoose = require('mongoose');
const session=require('express-session');
const MongoDbStore= require('connect-mongo')(session);
const passport=require('passport');
require('dotenv').config();
const passportInit=require('./app/config/passport');
//var bodyParser = require('body-parser');

//mongoose connection 
mongoose.connect('mongodb://127.0.0.1:27017/pizza');
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Data base connected');
}).catch(err=>{
  console.log('connection failed');
});
//.then(()=>{console.log('connected to mongodb')})
//.catch(err=>console.error('could not connect',err));




//session store
let mongoStore=new MongoDbStore({
   mongooseConnection:connection,
   collection:'session'
})



//session is a middleware
app.use(session({
secret:process.env.COOKIE_SECRET,
resave:false,
store:mongoStore,
saveUninitialized:false,
cookie:{maxAge:1000*60*60*24}  // life of cookie
}));



//passport configuration 

passportInit(passport);
app.use(passport.initialize()); 
app.use(passport.session()); // passport requires session 

app.use(flash());


// configure the app to use bodyParser()
/*app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());*/
//assert
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());// to display json data

//global middleware
app.use((req,res,next)=>{
  res.locals.session=req.session;
  res.locals.user=req.user;
  next();
})



// template engine
app.use(expressLayouts);
app.set('views',path.join(__dirname,'/resources/views'));// we are telling the path from it should render
app.set('view engine', 'ejs');// name of  the view engine


require("./routes/web")(app);


const PORT= process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log('connected');
});