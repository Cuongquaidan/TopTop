const User = require("../models/User")
const path = require('path');
const bcrypt = require('bcrypt');
const fs=require('fs');
const cloudinary = require("../services/cloudinary");

const register=async(req,res)=>{
    try {
        const {email,phone,password,username}=req.body
        if(!email&&!phone){
            return res.status(400).json({message:"Thiếu email/phone"})
        }
        if(!password||!username||!req.file){
            return res.status(400).json({message:"Thiếu thông tin khi tạo tài khoản"})
        }

        let existUser=await User.findOne({username})
        if(existUser){
            fs.unlinkSync(req.file.path)
            return res.status(409).json({message:'Tên người dùng đã tồn tại'});
        }
        if(phone){
            existUser=await User.findOne({phone})
            if(existUser){
                fs.unlinkSync(req.file.path)
                return res.status(409).json({message:'Sđt đã được đăng ký'});
            }
        }
        if(email){
            existUser=await User.findOne({email})
            if(existUser){
                fs.unlinkSync(req.file.path)
                return res.status(409).json({message:'Email đã được đăng ký'});
            }
        }

        const uploadResult=await cloudinary.uploader.upload(req.file.path,{
            resource_type: 'auto',
            folder:'profile_picture',
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
        })

        fs.unlinkSync(req.file.path)

        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            username,
            display_name:username,
            profile_picture:uploadResult.secure_url,
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

const getAllUser=async(req,res)=>{
    try {
        const data=await User.find()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({message:`Lỗi server: ${error}`})
    }
}

module.exports={register,getAllUser}