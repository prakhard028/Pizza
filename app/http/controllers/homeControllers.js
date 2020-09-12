//factory function
const Menu=require('../../models/menu');
function homeController(){  // inside this function we do all control operations(CRUD) like read , delete,update ,post

    return {
        index:async function(req,res) // used to read the page 
        {
          const menus= await Menu.find();
         //console.log(menus);
                res.render('home',{menus:menus});// it will render what is shown in home
        }
    }
}


module.exports=homeController;