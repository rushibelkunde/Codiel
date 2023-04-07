const express = require('express');
const cookieParser = require('cookie-parser')
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user")
const db = require("./config/mongoose")
const expressLayouts = require('express-ejs-layouts');
// used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')

app.use(express.urlencoded());
app.use(cookieParser())


app.use(express.static("./assets"))

app.use(expressLayouts);

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// setup view engine
app.set('view engine', 'ejs');
app.set("views" , "./views");

app.use(session({
    name: "codiel",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
    //     mongooseConnection: db,
    //     autoRemove: 'disabled'
    // },
    // (err)=>{
    //     console.log(err || "connect mongoDB setup ok")
    mongoUrl: 'mongodb://localhost/codial_development'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err){
        console.log("error", err);
    }
    console.log("server is running");
})