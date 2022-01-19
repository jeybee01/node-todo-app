const express = require('express');
const router = express.Router();

const {controllers} = require('../controller/list');

router.get('/', (req, res)=>{
    let tittleName = `Sign-Up`;
     res.render('register', {listTitle:tittleName, Message:req.flash('info')});
 });

 router.post('/register', controllers.createUser);

 router.get('/login', (req, res)=>{
    let tittleName = `Sign-In`;
     res.render('login', {listTitle:tittleName, Message:req.flash('info')})
 });

 router.post('/login', controllers.signIn);
 module.exports = router;