const User = require("../models/User")
const path = require('path');
const bcrypt = require('bcrypt');
const fs=require('fs');
const cloudinary = require("../services/cloudinary");

const getAllUser=async(req,res)=>{
    try {
        const data=await User.find()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({message:`Lỗi server: ${error}`})
    }
}

const getUserByID=async(req,res)=>{
    try {
        const {userID}=req.params
        const existUser=await User.findById(userID)
        if(!existUser){
            console.log("Không tìm thấy userID: ",userID);
            return res.status(400).json({message:`Không tìm thấy userID ${userID}`})
        }

        res.status(200).json({data:existUser})
    } catch (error) {
        res.status(500).json({message:`Lỗi server: ${error}`})
    }
}

module.exports={getAllUser,getUserByID}