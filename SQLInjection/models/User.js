const mongoose=require("mongoose")
const infoSchema = new mongoose.Schema({
    email:{
        type: String
    } ,
    //Each Message has an author
    name:{
        type: String
    },
    age: {
       type: Number,
       default: 0
    }
},{timestamps: true});
const User=mongoose.model('Security_infoSchema', infoSchema) 
module.exports={User}