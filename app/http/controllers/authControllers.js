//factory function
const bcrypt=require('bcrypt');
const User=require('../../models/user');
const passport =require('passport');
function authController(){

    return {
        register: function(req,res)
        {
                res.render('auth/register');// it will render what is shown in home
             
        },
        login: function(req,res)
        {
                res.render('auth/login');// it will render what is shown in home
             
        },
        postLogin:function(req,res,next){
          passport.authenticate('local',(err,user,info)=>{
             if(err){
               req.flash('error',info.message)
               return next(err)
             }
             if(!user){
              req.flash('error',info.message)
              return res.redirect('/login');
             }
            req.login(user,(err)=>{
                 if(err){
                   req.flash('error',info.message)
                   return next(err);
                 }
                 return res.redirect('/');
            })

          })(req,res,next)
        },
       postRegister: async function (req,res){

          const {name ,email , password}=req.body;
          if(!name || !email || !password)
          {
            req.flash('error','All fields are required');
            return res.redirect('/register');
          }
        // check if email exits
        User.exists({email:email},(err,result)=>{
          if(result)
          {
            req.flash('error','Email already exist');
            return res.redirect('/register');
          }
        });

        // hashing 
        const hashedPassword=await  bcrypt.hash(password,10);
        // if new, create new user
        const user=new User({
          name:name,
          email:email,
          password:hashedPassword
        });
        user.save().then((user)=>{
          //login
          res.redirect('/');
        }).catch(err=>{
          req.flash('error','Something went wrong');
          return res.redirect('/register');
        })
      
        },
        logout:function(req,res){
          req.logout();
          return res.redirect('/'); 
        }
    }
}


module.exports=authController;