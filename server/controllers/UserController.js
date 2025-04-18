const User = require("../models/User")



const getAllUser=async(req,res)=>{
    try {
        const data=await User.find()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({message:`Lỗi server: ${error}`})
    }
}

module.exports={getAllUser}