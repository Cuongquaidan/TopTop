const fs=require('fs')
const cloudinary=require('../services/cloudinary');
const Post = require('../models/Post');
const uploadPost=async(req,res)=>{
    try {
        const {caption,tags,username,display_name,profile_picture,publicity,location}=req.body

        if(!req.files||!req.files.video||!req.files.thumbnail) {
            await fs.promises.unlink(req.files.video[0].path)
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

        await fs.promises.unlink(req.files.video[0].path)
        await fs.promises.unlink(req.files.thumbnail[0].path)

        const newPost=new Post({
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
                duration:Math.round(videoUploadResult.duration),
                publicity:publicity,
                location:location
            }
        })

        await newPost.save()
        res.status(200).json({message:'upload Post thành công',post:newPost})
    } catch (error) {
        console.log('Lỗi khi uploadPost: ',error);
        await fs.promises.unlink(req.files.video[0].path)
        res.status(500).json({message:"Lỗi server",error:error})
    }
}

const getAllPost=async(req,res)=>{
    try {
        let data=await Post.find()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports={uploadPost,getAllPost}