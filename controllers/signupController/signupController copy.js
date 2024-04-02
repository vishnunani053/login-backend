const signupModel = require("../../models/signupModel");
const bcrypt = require("bcrypt")

const signupController = async(req,res)=>{
    try {
        const {name,email,password,mobileNumber}=req.body;

        const user = await signupModel.findOne({email:email})
        if(user){
            return res.status(400).json({
                message:"user Already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        console.log("hashed password",hashedPassword)
        const result = await signupModel.create({
            name,
            email,
            mobileNumber,
            password:hashedPassword
        })
        console.log("result",result)
        res.status(200).json({
            success: true,
            message: "signup successful",
        });

    } catch (error) {
        res.status(400).json("failed to create user")
    }
}

module.exports = signupController