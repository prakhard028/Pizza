const bcrypt=require('bcrypt');
const LocalStrategy= require('passport-local').Strategy;
const User = require('../models/user');
//const passport=require('passport');
function init(passport){

passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done)=>{ // done is a callback function
//login 
//check mail exist
const user =await User.findOne({email:email});
if(!user)
    return done(null ,false, {message:'No user with this email'});

        bcrypt.compare(password,user.password).then(match=>{
        if(match){
        return done(null,user,{message:'Logged in successfully'});
         }
         // if does not matches
          return done(null, false , 'Incorrect Password');
           }).catch(err=>{
              return done(null, false , 'Something went wrong');
             })
            }))
        

  //serialization -> tells us that user is logged in or not(store data in session )
passport.serializeUser((user, done)=>{  // we get from done at line 15
    done(null, user._id);
});  


// deserialization -> help us to get complete data using saved data in session 
passport.deserializeUser((id, done)=>{
User.findById(id,(err,user)=>{
    done(err,user);
});
});


}



module.exports=init;