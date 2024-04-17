const userModel = require("../../models/usersFormModel")


const updateUser = async(req,res)=>{
    const userId = req.params.id
try {
    const userDetails ={
        name,
		phoneNumber,
		email,
		city,
		dematAccount,
		language,
		tandc,
    }=req.body
const existingUser = await userModel.findById(userId)
    if (!existingUser) {
        return res.status(400).json({message:"user not found"})
    }
    const updatedUser= await userModel.findByIdAndUpdate(userId,{$set:userDetails},{new:true})
    res.status(201).json({
        message:("user updated",updatedUser)
    })
console.log(updatedUser)
} catch (error) {
    res.status(400).json({message:error})
}
}


module.exports = updateUser