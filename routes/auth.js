const express = require('express');
const router = express.Router();

const {controllers} = require('../controller/list');

router.get('/', (req, res)=>{
    console.log(req.session);
    let tittleName = `sign-Up`;
    const regMessage = req.flash('users');
     res.render('register', {listTitle:tittleName, regMessage:regMessage});
 });

 router.post('/register', controllers.createUser);

 router.get('/login', (req, res)=>{
    let tittleName = `sign-In`;
    const signinError= req.flash('user')
     res.render('login', {listTitle:tittleName, signinError:signinError})
 });

 router.post('/login', controllers.signIn);
 module.exports = router;