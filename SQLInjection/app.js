const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {User}=require("./models/User");
const { exec } = require("child_process");
require('dotenv').config();

//Connection To DB
mongoose.connect(process.env.DB_Production, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    console.log("Connected to mongoDB")
})
.catch(err=>{console.log(err)})
app.set("view engine", "ejs")
app.use('/public', express.static('public'));
app.get('/', async (req, res)=>{
    res.render('home')
})
//SQL Injection Command {"$gt": " "}
app.get('/user', async (req, res)=>{
    try{    
        const email=req.query.email
        const query={
            email: JSON.parse(email)
        }
        console.log(query)
        const foundUser=await User.find(query)
        res.render('display', {users: foundUser})
    }catch(err){
        console.log(err)
        res.send(`Something went wrong ${err.message}`)
    }
})
//Cammand Injection Node.js, path= app.js; rm test1.txt

//var fs=require("fs"),stream=fs.createWriteStream("bigFile.txt",{flags:"w"});const megabyte="1000000",outputStr="thisisabigfile";for(var i=0;i<megabyte/outputStr.length;i++)stream.write("thisisabigfile");
app.get('/file', async (req, res)=>{
    try{
        const path=req.query.path
        console.log(path)
        exec('cat '+`${path}`, (error, stdout, stderr) => {
            if (error) {
                throw new Error(`error: ${error.message}`);
            }
            if (stderr) {
                throw new Error(`stderr: ${stderr}`)
            }
            res.send(`stdout: ${stdout}`);
        })

    }catch(err){
        console.log(err)
        res.send(`Something went wrong ${err.message}`)
    }
})
app.get('*', (req, res)=>{
    res.send('Illegal Path')
})
app.listen(8080, ()=>{
    console.log('Server has started')
})