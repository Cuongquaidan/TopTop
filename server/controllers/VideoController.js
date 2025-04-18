const fs=require('fs')
const cloudinary=require('../services/cloudinary');
const Video = require('../models/Video');
const uploadVideo=async(req,res)=>{
    try {
        const {caption,tags,username,display_name,profile_picture}=req.body

        if(!req.files||!req.files.video||!req.files.thumbnail) {
            return res.status(400).json({ message: "Thiếu video hoặc thumbnail" });
        }

        const videoUploadResult=await cloudinary.uploader.upload(req.files.video[0].path,{
            resource_type: "video",
            folder: "toptop/videos"
        })
        const thumbUploadResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
            resource_type: "image",
            folder: "toptop/thumbnails"
        });

        fs.unlinkSync(req.files.video[0].path)
        fs.unlinkSync(req.files.thumbnail[0].path)

        const newVideo=new Video({
            postId:username+'_'+Date.now(),
            user:{
                username,
                display_name,
                profile_picture
            },
            caption,
            tags:tags?JSON.parse(tags):[],
            media:{
                url:videoUploadResult.secure_url,
                thumbnail:thumbUploadResult.secure_url,
                duration:Math.round(videoUploadResult.duration)
            }
        })

        await newVideo.save()
        res.status(200).json({message:'upload Video thành công',video:newVideo})
    } catch (error) {
        console.log('Lỗi khi uploadVideo: ',error);
        res.status(500).json({message:"Lỗi server",error:error})
    }
}

const getAllVideo=async(req,res)=>{
    try {
        let data=await Video.find()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports={uploadVideo,getAllVideo}