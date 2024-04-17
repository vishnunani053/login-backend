const userModel = require("../../models/usersFormModel")


const deleteUsers= async(req,res)=>{
    const id=req.params.id
    try {
        const deletedUsers= await userModel.deleteOne({_id:id})
        // const deletedUsers= await userModel.deleteMany({})
        if (!deletedUsers) {
            return res.status(400).json({message:"failed to delete",deletedUsers})
        }
        console.log("deletedUsers",deletedUsers)
        res.status(200).json({message:"data deleted sucessfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports=deleteUsers