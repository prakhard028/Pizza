const mongoose = require('mongoose');

const orderSchema=mongoose.Schema(
    {
      customerId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User', 
          required:true },
      items:{type:Object,required:true},
      phone:{type:String,required:true},
      address:{type:String,required:true},
      paymentMethod:{type:String,default:'COD'},
      status:{type:String,default:'order_placed'} 
    },{timestamps:true});


    const Order=mongoose.model('Order',orderSchema);// singular name of model, it turns pural in collection 

    module.exports=Order;