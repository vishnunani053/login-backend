const loginModel = require("../../models/loginModel");
const bcrypt = require('bcrypt')

const signupController = async (req, res) => {
  const { userName, password, email, mobile } = req.body;
  try {
    const existingUser = await loginModel.findOne({ email: email });
    if (existingUser) {
      return res.status(402).json({
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hashSync(password,10)
    const createUser = await loginModel.create({
      userName,
      password:hashedPassword,
      email,
      mobile,
    });
    res.status(200).json({
        message:"user created sucessfully",
        data:createUser
    })
  } catch (error) {
    res.status(400).json({
        message:"internal server error"
    })
    console.log(error)
  }
};

module.exports = signupController;
