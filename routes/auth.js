const express = require('express');
const router = express.Router();

const {controllers} = require('../controller/list');

router.get('/', (req, res)=>{
    let day = `sign-Up`
     res.render('register', {listTitle:day})
 });

 router.post('/register', controllers.createUser);

 router.get('/login', (req, res)=>{
    let day = `sign-In`
  let  signinError = "";
     res.render('login', {listTitle:day, signinError:signinError})
 });

 router.post('/login', controllers.signIn);
 module.exports = router;