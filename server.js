const express=require('express');
const app= express();
const ejs= require('ejs');
const path=require('path');
const expressLayouts= require('express-ejs-layouts');


app.use(express.static('public'));



// template engine
app.use(expressLayouts);
app.set('views',path.join(__dirname,'/resources/views'));// we are telling the path from it should render
app.set('view engine', 'ejs');// name of  the view engine


app.get('/',(req, res)=>{
    res.render('home');// it will render what is shown in home
 });
 app.get('/cart',(req, res)=>{
     res.render('customer/cart');// it will render what is shown in home
  });
  app.get('/login',(req, res)=>{
    res.render('auth/login');// it will render what is shown in home
 });
 app.get('/register',(req, res)=>{
    res.render('auth/register');// it will render what is shown in home
 });


const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('connected');
});