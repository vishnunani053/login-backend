const mongoose = require("mongoose")

const signupSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobileNumber:{type:String},
    password:{type:String},
})

const signupModel= mongoose.model('signupDetails',signupSchema)
module.exports=signupModel