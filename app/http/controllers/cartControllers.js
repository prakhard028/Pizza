//factory function

function cartController(){

    return {
        cart: function(req,res)
        {
                res.render('customer/cart');// it will render what is shown in home   
        },
      update:function(req,res)
        {
            //for the first time adding items and system cart structure in the session 
            if(!req.session.cart)
            {
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
            }
           let cart=req.session.cart;
            console.log(cart);
            // check if item does not exist in cart
            if(!cart.items[req.body._id])
            {
                cart.items[req.body._id]=
                {
                    items:req.body,
                    qty:1
                }
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price;
            }
            else
            { // if already present then just update
                cart.items[req.body._id].qty = cart.items[req.body._id]+1;
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price;
            }
           
          return res.json({totalQty:req.session.cart.totalQty});
      
        }
    }
}


module.exports=cartController;