const express = require('express');
const cookieParser = require('cookie-parser')
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user")
const db = require("./config/mongoose")
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser())


app.use(express.static("./assets"))

app.use(expressLayouts);

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// setup view engine
app.set('view engine', 'ejs');
app.set("views" , "./views");

app.use('/',require('./routes'));






app.listen(port,(err)=>{
    if(err){
        console.log("error");
    }
    console.log("server is running");
})