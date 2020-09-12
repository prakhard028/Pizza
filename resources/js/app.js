import axios from 'axios';

let addToCart = document.querySelectorAll('.addtocart'); // selecting all the buttons and in addToCart we are getting array
console.log(addToCart+"hello add");


 /*function updateCart(pizza) // its ajax call, then we use axios
{
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res);
    })
}*/


addToCart.forEach((btn)=>{
    console.log("hi");
    btn.addEventListener('click',(e)=>{
        console.log('button');
     console.log(e); //  here we are getting response on each press
    let pizza =JSON.parse(btn.dataset.pizza); // this help us to get data of 
    console.log(pizza);
//updateCart(pizza);

    })
});