const { sign } = require("jsonwebtoken")
const signupModel = require("../../models/signupModel")
const bcrypt = require('bcrypt')
const { json } = require("body-parser")

const signinController=async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingUser =await signupModel.findOne({email:email})
        if (!existingUser) {
            return res.status(400).json({
                message:"user not exist"
            })
        }
        const passwordMatched =await bcrypt.compare(password,existingUser.password)
       if (!passwordMatched) {
        return res.status(401).json({
            status:false,
            message:"password doesnt match"
        })
       }
      
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
        const token = await sign(JSON.stringify(existingUser),JWT_SECRET_KEY)
        res.status(200).json({
            message:"user login sucessfully",
            data:{existingUser,token}
        })
        console.log("user login sucessfully",data)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = signinController