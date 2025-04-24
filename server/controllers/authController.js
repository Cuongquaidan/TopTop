const User = require("../models/User")
const bcrypt=require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const register=async(req,res)=>{
    try {
        const {email,phone,password,username}=req.body
        
        if(!email&&!phone&&!username){
            return res.status(400).json({
                message:"Thiếu email/phone/username",
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

        let existUser=null
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
        if(email){
            existUser=await User.findOne({email})
            if(existUser){
                return res.status(409).json({
                    message:'Email đã được đăng ký',
                    data:[],
                    success:false,
                    error:false
                });
            }
        }
        if(username){
            existUser=await User.findOne({username})
            if(existUser){
                return res.status(409).json({
                    message:'Username đã được đăng ký',
                    data:[],
                    success:false,
                    error:true
                });
            }
        }

        let tempUserName
        if(!username) 
            tempUserName = 'user_' + uuidv4().slice(0, 8)

        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            username:username?username:tempUserName,
            display_name:username?username:tempUserName,
            profile_picture:null,
            password:hashedPassword,
        })
        if(email)
            newUser.email=email
        if(phone)
            newUser.phone=phone

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
        const {email,username,password}=req.body
        let existUser=null

        if(!email&&!username){
            return res.status(400).json({
                message:'Thiếu email/username',
                data:[],
                success:false,
                error:true
            })
        }
        if(!password){
            return res.status(400).json({
                message:'Thiếu mật khẩu',
                data:[],
                success:false,
                error:false
            })
        }

        if(email){
        existUser=await User.findOne({email}).select('+password')
            if(!existUser){
                return res.status(404).json({
                    message:'Không tìm thấy tài khoản theo email',
                    data:[],
                    success:false,
                    error:false
                })
            }
        }

        if(username){
            existUser=await User.findOne({username}).select('+password')
            if(!existUser){
                return res.status(404).json({
                    message:'Không tìm thấy tài khoản theo username',
                    data:[],
                    success:false,
                    error:false
                })
            }
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

