const express = require('express');
const router = express.Router();
const date = require('../views/date');
const {controllers} = require('../controller/list');
const db = require('../model/index');



 router.get('/list', (req, res)=>{
   let day = date();
    db.items.findAll({})
    .then(item=>{
     return res.render('list', {listTitle:day, newListItems:item,  Message:req.flash('info')});
    })
    .catch(err=>{
    console.log(err)

    })
 });
 router.post('/list', controllers.findAllList);
 router.post('/delete', controllers.deleteTodo);

 module.exports = router;