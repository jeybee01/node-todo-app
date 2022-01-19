const express = require('express')
const bodyParser= require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const date = require('./views/date');

// initalize sequelize with session store
var MySQLStore = require('express-mysql-session')(session);

const authRouter = require('./routes/auth');
const listRouter = require('./routes/list');


const app = express()
const port =process.env.PORT || 1111;

app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));

app.use(cookieParser('secretStringForCookies'));
app.use(session({
    secret:'secretStringForSession',
    cookie:{maxAge:60000},
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

const db = require('./model/index');
(async () => {
    await db.sequelize.sync({ force: false});
  })(); 



app.use('/', authRouter);
app.use('/', listRouter);




app.get('/work', (req,res)=>{
    res.render('list', {listTitle: "Work List", newListItems:workItem});
})

app.post('/work', (req, res)=>{
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect('/work')
})
app.listen(port, ()=>{
    console.log("server is listening on port " + port)
})