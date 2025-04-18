const User = require("../models/User")
const bcrypt=require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const register=async(req,res)=>{
    try {
        const {email,phone,password}=req.body
        if(!email&&!phone){
            return res.status(400).json({message:"Thiếu email/phone"})
        }
        if(!password){
            return res.status(400).json({message:"Thiếu mk"})
        }

        if(phone){
            existUser=await User.findOne({phone})
            if(existUser){
                return res.status(409).json({message:'Sđt đã được đăng ký'});
            }
        }
        if(email){
            existUser=await User.findOne({email})
            if(existUser){
                return res.status(409).json({message:'Email đã được đăng ký'});
            }
        }

        const username = 'user_' + uuidv4().slice(0, 8)
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            username,
            display_name:username,
            profile_picture:null,
            password:hashedPassword,
            email:email?email:null,
            phone:phone?phone:null,
        })

        await newUser.save()
        res.status(201).json({ message: 'Tạo tài khoản thành công', user: newUser });
    } catch (error) {
        console.log("Lỗi khi thêm user:",error);
        res.status(500).json({message:`Lỗi server: ${error}`})
    }
}

const loginEmail=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser=await User.findOne({email}).select('+password')
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

const loginPhone=async(req,res)=>{
    try {
        const {phone,password}=req.body
        const existUser=await User.findOne({phone}).select('+password')
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

module.exports={register,loginEmail,loginPhone}