const Order=require("../../models/order");

function orderControllers(){
return{
    storeOrders:function(req,res){
        //validate request
        const {phone, address}=req.body;
        if(!phone || !address)
        {
            req.flash ('error','ALl field are required');
            return res.redirect('/cart');
        }

        const order= new Order({
            customerId:req.user._id,
            items:req.session.cart.items,
            phone:phone,
            address:address
        })
        order.save().then(result=>{
            req.flash('success','order placed');
            return res.redirect('/');  
        }).catch(err=>{
            req.flash('error','something went wrong');
            return res.redirect('/cart');
        })
    }
}
}

module.exports=orderControllers;