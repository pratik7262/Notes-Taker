const express=require('express')
const path=require('path');
const bodyParser=require('body-parser')
const fs = require('fs');

let port= process.env.PORT||80;

const app=express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/static', express.static('static'));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));


app.get('/',(req,res)=>{
   res.status(200).render("home");
});


app.listen(port);