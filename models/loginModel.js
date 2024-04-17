const  mongoose  = require("mongoose");

const loginSchema = new mongoose.Schema({
	userName:{type:String},
	password:{type:String},
	email:{type:String},
	mobile:{type:String}
},
{
	timestamps:true
}
)

const loginModel = mongoose.model("vishnu-login",loginSchema)

module.exports = loginModel