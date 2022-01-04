const express = require('express');
const router = express.Router();

const {controllers} = require('../controller/list');



 router.get('/', (req, res)=>{
    let day = `sign-Up`
    //  res.render('list', {listTitle:day})
    res.redirect('/list');
 });
 router.post('/list', controllers.findAllList);
 router.post('/delete', controllers.deleteTodo);

 module.exports = router;