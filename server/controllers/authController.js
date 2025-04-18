const User = require("../models/User")
const bcrypt=require('bcrypt')
const login=async(req,res)=>{
    try {
        const {account,password}=req.body
        const existUser=await User.findOne({account}).select('+password')
        if(!existUser){
            return res.status(404).json({message:'Không tìm thấy tài khoản',status:false})
        }
        
        const checkPasword=await bcrypt.compare(password,existUser.password)
        if(!checkPasword){
            return res.status(409).json({message:'Sai mật khẩu',status:false})
        }

        res.status(200).json({message:'Đăng nhập thành công',status:true})
    } catch (error) {
        console.log('Lỗi khi đăng nhập: ',error);
        res.status(500).json({message:`Lỗi server: ${error}`,status:false})
    }
}

module.exports={login}