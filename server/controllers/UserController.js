const User = require("../models/User")
const path = require('path');
const bcrypt = require('bcrypt');
const fs=require('fs');
const cloudinary = require("../services/cloudinary");

const register=async(req,res)=>{
    try {
        const {account,password,username}=req.body
        if(!account||!password||!username||!req.file){
            return res.status(400).json({message:"Thiếu thông tin khi tạo tài khoản"})
        }

        const existUser=await User.findOne({$or:[{username},{account}]})
        if(existUser){
            fs.unlinkSync(req.file.path)
            return res.status(409).json({message:'Tên người dùng hoặc tài khoản đã tồn tại'});
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
            account
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