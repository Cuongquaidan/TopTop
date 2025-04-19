const User = require("../models/User")
const bcrypt=require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const register=async(req,res)=>{
    try {
        const {other,phone,password}=req.body
        if(!other&&!phone){
            return res.status(400).json({
                message:"Thiếu other/phone",
                data:[],
                success:false,
                error:false
            })
        }
        if(!password){
            return res.status(400).json({
                message:"Thiếu mk",
                data:[],
                success:false,
                error:false
            })
        }

        if(phone){
            existUser=await User.findOne({phone})
            if(existUser){
                return res.status(409).json({
                    message:'Sđt đã được đăng ký',
                    data:[],
                    success:false,
                    error:true
                });
            }
        }
        if(other){
            existUser=await User.findOne({other})
            if(existUser){
                return res.status(409).json({
                    message:'Other đã được đăng ký',
                    data:[],
                    success:false,
                    error:true
                });
            }
        }

        const username = 'user_' + uuidv4().slice(0, 8)
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            username,
            display_name:username,
            profile_picture:null,
            password:hashedPassword,
            other:other?other:null,
            phone:phone?phone:null,
        })

        await newUser.save()
        res.status(201).json({ 
            message: 'Tạo tài khoản thành công', 
            data: newUser,
            success:true,
            error:false
        });
    } catch (error) {
        console.log("Lỗi khi thêm user:",error);
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

const loginOther=async(req,res)=>{
    try {
        const {other,password}=req.body
        const existUser=await User.findOne({other}).select('+password')
        if(!existUser){
            return res.status(404).json({
                message:'Không tìm thấy tài khoản',
                data:[],
                success:false,
                error:true
            })
        }
        
        const checkPasword=await bcrypt.compare(password,existUser.password)
        if(!checkPasword){
            return res.status(409).json({
                message:'Sai mật khẩu',
                data:[],
                success:false,
                error:true
            })
        }

        res.status(200).json({
            message:'Đăng nhập thành công',
            data:existUser,
            success:true,
            error:false
        })
    } catch (error) {
        console.log('Lỗi khi đăng nhập: ',error);
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

const loginPhone=async(req,res)=>{
    try {
        const {phone,password}=req.body
        const existUser=await User.findOne({phone}).select('+password')
        if(!existUser){
            return res.status(404).json({
                message:'Không tìm thấy tài khoản',
                data:[],
                success:false,
                error:false
            })
        }
        
        const checkPasword=await bcrypt.compare(password,existUser.password)
        if(!checkPasword){
            return res.status(409).json({
                message:'Sai mật khẩu',
                data:[],
                success:false,
                error:true
            })
        }

        const data=await User.findOne({phone})

        res.status(200).json({
            message:'Đăng nhập thành công',
            data:data,
            success:true,
            error:false
        })
    } catch (error) {
        console.log('Lỗi khi đăng nhập: ',error);
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

module.exports={register,loginOther,loginPhone}

