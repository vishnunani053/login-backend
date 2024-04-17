const signupModel = require("../../models/signupModel")
const bcrypt = require("bcrypt")

const signupController=async(req,res)=>{
    const {name,email,mobileNumber,password}=req.body
try {
   const existingUser = await signupModel.findOne({email:email})
   if (existingUser) {
   return res.status(400).json({
        success:false,
        message:"user already exist"
    })
    
   }
//    const hashedPassword = await bcrypt.hash(password,10)
    const result = await signupModel.create({
        name ,
        email,
        mobileNumber,
        // password:hashedPassword
        password,
    })
    res.status(200).json({
        success: true,
        message: "signup successful",
    })
   console.log("result",result)
    
} catch (error) {
    console.log("err",error)
    
}
}

module.exports =signupController