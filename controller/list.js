const db = require('../model/index');
const bcrypt =require('bcryptjs');
const date = require('../views/date')

exports.controllers ={
   createUser:async (req, res)=>{
      const userInfo = req.body;
      const hashPassword =userInfo.password;
      const email = userInfo.email;
        const user = await db.users.findOne({where:{email:email}});

               if(user){
                  req.flash('info', "User with this Email Already Exist");
                 return  res.redirect('/');
               }
            else{
                  userInfo.password = await bcrypt.hash(hashPassword, 8);
                  const data = await db.users.create(userInfo);
                  if(!data){
                     return res.redirect('/');
                  }
                  else{
                     req.flash('info', 'User Created');
                     return res.redirect('/login');
                  }
                 
               
            }
   
     
   },

   signIn: async (req, res)=>{
      const {email, password} = req.body;
        const user = await  db.users.findOne({where:{email:email}})
        console.log(user)
            if(!user || user === null){
              req.flash('info', "Provided Wrong Email!");
               return res.redirect('/login')
            }
            else{
               const isHashPassword = await bcrypt.compare(password, user.password);
               if(!isHashPassword){
                  req.flash('info', 'Provided Wrong Password !');
                  return res.redirect('/login');
               }
               else{
                  req.flash('info', user.firstname);
                  return res.redirect('/list');
               }
            }      
         
   },
   findAllList: (req, res)=>{       
      const errors ="Opps! You did not add a task" ;
   let day = date();
    let item =  req.body.newItem
    if(item === "" || item===undefined){
    res.render('error', {listTitle:day, newListItems:item, error:errors})
        return
    }
    if(req.body.list=== "work"){
        workItem.push(item);
        res.redirect('/work');
    }
    else{
      (async () => {
        const list = await db.items.create({ todo: item });
        res.redirect('/list');
                   })();  
    }
   },
   deleteTodo: (req, res)=>{
      const checkboxItemId =req.body.checkbox;
    (async ()=>{
        const itemdeleted = await db.items.destroy({
            where: {
              id: checkboxItemId
            }
          })
    res.redirect('/list');

    })();
   }
}