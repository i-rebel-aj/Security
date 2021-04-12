const faker = require('faker')
const mongoose = require("mongoose");
const {User}=require('./models/User')
require('dotenv').config();
//Connection To DB
mongoose.connect(process.env.DB_Production, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    console.log("Connected to mongoDB")
})
.catch(err=>{console.log(err)})
const populateDB=async ()=>{
    for(let i=0;i<50;i++){
        let newUser={
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: Math.floor(Math.random()*80)
        }
        let newUserDB=new User(newUser)
        await newUserDB.save()
        console.log(`Inserted into DB # ${i}`)
    }
}
populateDB()