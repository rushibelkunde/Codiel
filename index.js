const express = require('express');
const port = 3000;
const app = express()

app.use('/',require('./routes'))



app.listen(port,(err)=>{
    if(err){
        console.log("error")
    }
    console.log("server is running")
})