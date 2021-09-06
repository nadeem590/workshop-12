const express = require('express');
const mongoose = require('mongoose');
const app=express();
const userModel = require('./model/userSchema');
app.use(express.json());
const port=process.env.PORT || 4000;
require('./model/db');
var bodyParser= require('body-parser');
const { db } = require('./model/userSchema');
var jsonParser = bodyParser.json();

app.get('/users',function(req,res){
   userModel.find().select('username').then((data)=>{
       res.status(201).json(data);
    });
});

app.get('/search/:username',function(req,res){
    var regex=new RegExp(req.params.username,'i');
    userModel.find({username:regex}).then((result)=>{
        res.status(200).json(result)
    });
});

app.get('/sorting',async function(req,res){
    //db.userSchema.find().sort({KEY:1});
    // const sort = {}
    // if(req.query.sortBy){
    //     const str = req.query.sortBy.split(':')
    //     sort[str[0]] = str[1] === 'desc' ? -1:1
    // }
    const user=await userModel.find().sort({_id:-1});
    res.status(200).json(user);
});
app.get('/pagination',async(req,res)=>{
    const user=await userModel.find().skip(1).limit(3);
    res.status(200).send(user);
})
app.listen(port, ()=>{
    console.log('server is running up on port '+port);

});