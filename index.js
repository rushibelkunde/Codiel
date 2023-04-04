const express = require('express');
const port = 3000;;
const app = express();

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