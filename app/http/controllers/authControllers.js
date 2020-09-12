//factory function

function authController(){

    return {
        register: function(req,res)
        {
                res.render('auth/register');// it will render what is shown in home
             
        },
        login: function(req,res)
        {
                res.render('auth/login');// it will render what is shown in home
             
        }
    }
}


module.exports=authController;