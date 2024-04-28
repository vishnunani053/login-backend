const loginModel = require("../../models/loginModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signInController = async (req, res) => {
  const { password,userName } = req.body;
  try {
    const existingUser =await loginModel.findOne({userName:userName})
    if (!existingUser) {
        return res.status(402).json({
            message:"user not exist"
        })        
    }

const passwordMatched = await bcrypt.compare(password,existingUser.password)
if (!passwordMatched) {
    return res.status(403).json({
        message:"password mis match"
            })
}
const secretKey = process.env.JWT_SECRET_KEY
const token = jwt.sign(JSON.stringify(existingUser),secretKey)
const profileName = existingUser.userName
const userEmail = existingUser.email
res.status(200).json({
    message:"user login sucessfull",
    data:existingUser,
    token:token,
    userName:profileName,
    email:userEmail,
})

  } catch (error) {
    res.status(400).json({
        message:"internal server error"
    })
    console.log(error)
  }
};

module.exports = signInController