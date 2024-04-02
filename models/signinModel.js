const mongoose = require('mongoose')

const signinSchema =new mongoose.Schema({
    email:{type:String},
    password:{type:String}
})

const signinModel = mongoose.model("loginDetails",signinSchema)

module.exports=signinModel