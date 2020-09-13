import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll('.addtocart'); // selecting all the buttons and in addToCart we are getting array
console.log(addToCart+"hello add");

let cartCounter=document.querySelector('cartCounter');

 function updateCart(pizza) // its ajax call, then we use axios
{
    
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res);
      //  cartCounter.innerHTML=res.data.totalQty;
              
new Noty({
    type:'success',
    timeout:1000,
    text: 'Items are added to cart'
}).show();
 
    }).catch(err=>{
        new Noty({
            type:'success',
            timeout:1000,
            text: 'Something Went Wrong'
        }).show();
    })
     
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
       // console.log('button');
     console.log(e); //  here we are getting response on each press
    let pizza =JSON.parse(btn.dataset.pizza); // this help us to get data of 
    console.log(pizza);
updateCart(pizza);

    })
});