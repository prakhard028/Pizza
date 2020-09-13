const mongoose = require('mongoose');

const userSchema=mongoose.Schema(
    {
      name:{type:String, required:true },
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true},
      role:{type:String,default:'customer'} // manual added admin
    },{timestamps:true});


    const User=mongoose.model('User',userSchema);// singular name of model, it turns pural in collection 

    module.exports=User;