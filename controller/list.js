const db = require('../model/index');
const bcrypt =require('bcryptjs');
const date = require('../views/date')

exports.controllers ={
   createUser:async (req, res)=>{
      // const day = date()
      const userInfo = req.body;
      const hashPassword =userInfo.password;
      const email = userInfo.email;
       db.users.findOne({where:{email:email}})
                .then(async(user)=>{
            if(!user){
               // console.log(user);
            userInfo.password = await bcrypt.hash(hashPassword, 8);
          return  db.users.create(userInfo)
               .then((data)=>{
                  console.log(data,'redirect login');
                  res.redirect('list');
            })
               .catch((err)=>{
                  console.log(err)
               });
            }
            else{
             //  res.render('register', {listTitle:day}); 
             console.log('user with this email exist, sign Up')
             res.redirect('/');
            }
                     }) 
         .catch((err)=>{
            console.log(err.message);
         });
     
   },

   signIn: (req, res)=>{
      const {email, password} = req.body;
      const day = "Sign In";
      let  signinError = "";
      console.log(email, password);
         db.users.findOne({where:{email:email}})
         .then( async (user)=>{
            console.log(user)
            
            if(!user){
                signinError = "Wrong email or Password";
               return  res.render('login', {listTitle:day, signinError:signinError});
            }
            else{
               const isHashPassword = await bcrypt.compare(password, user.password);
               if(!isHashPassword){
                    signinError = "Wrong email or Password";
                  return  res.render('login', {listTitle:day, signinError:signinError});
               }
               else{
                  return res.redirect('/list');
               }
            }
         })
         .catch((err)=>{
            console.log(err)
         })
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