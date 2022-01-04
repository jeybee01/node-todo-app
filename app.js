const express = require('express')
const bodyParser= require('body-parser');
const date = require('./views/date');

const authRouter = require('./routes/auth');
const listRouter = require('./routes/list');


const app = express()
 let workItem = [];   

app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const db = require('./model/index');
(async () => {
    await db.sequelize.sync({ force: false});
  })(); 



app.use('/', authRouter);
app.use('/', listRouter);


app.get('/list', (req, res)=>{
    let day = date();
    const errors = "Opps! You did not add a task";
     db.items.findAll({})
     .then(item=>{
         // console.log(item[0].todo, "here")
     res.render('list', {listTitle:day, newListItems:item, error:errors});
     })
     .catch(err=>{
     console.log(err)
 
     })
 });




app.get('/work', (req,res)=>{
    res.render('list', {listTitle: "Work List", newListItems:workItem});
})

app.post('/work', (req, res)=>{
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect('/work')
})
const PORT = 1111
app.listen(PORT, ()=>{
    console.log("server is listening on port " + PORT)
})