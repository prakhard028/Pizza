
const homeControllers= require("../app/http/controllers/homeControllers");
const guest=require("../app/http/middlewares/guest");
const authControllers= require("../app/http/controllers/authControllers");
const cartControllers= require("../app/http/controllers/cartControllers");
const orderControllers=require("../app/http/controllers/orderControllers");
function initRoutes(app){
app.get('/',   homeControllers().index);
app.get('/login',guest,authControllers().login);
app.get('/register',guest, authControllers().register);
app.post('/register', authControllers().postRegister);
app.get('/cart', cartControllers().cart);
app.post('/update-cart', cartControllers().update);
app.post('/login',authControllers().postLogin);
app.post('/logout',authControllers().logout);
app.post('/orders',orderControllers().storeOrders);
};

module.exports= initRoutes;