const fs=require('fs')
const multer=require('multer')
const path=require('path')
const cloudinary=require('../services/cloudinary');
const Post = require('../models/Post');
const User = require('../models/User');
const { totalmem } = require('os');
const uploadVideoPost=async(req,res)=>{
    try {
        const {caption,tags,user,publicity,location}=req.body

        if(!req.files||!req.files.video||!req.files.thumbnail) {
            await fs.promises.unlink(req.files.video[0].path)
            await fs.promises.unlink(req.files.thumbnail[0].path)
            return res.status(400).json({ 
                message: "Thiếu video hoặc thumbnail",
                data:[],
                success:false,
                error:false
            });
        }

        const existUser=await User.findById(user)
        if(!existUser){
            await fs.promises.unlink(req.files.video[0].path)
            await fs.promises.unlink(req.files.thumbnail[0].path)
            return res.status(400).json({
                message: "Không tìm thấy userID",
                data:[],
                success:false,
                error:false
            });
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
            user,
            caption,
            tags:tags?JSON.parse(tags):[],
            publicity:publicity,
            location:location,
            type:'video',
            media:{
                url:videoUploadResult.secure_url,
                thumbnail:thumbUploadResult.secure_url,
                duration:Math.round(videoUploadResult.duration),
            }
        })

        await newPost.save()
        res.status(200).json({
            message:'upload VideoPost thành công',
            data:newPost,
            success:true,
            error:false
        })
    } catch (error) {
        console.log('Lỗi khi uploadVideoPost: ',error);
        await fs.promises.unlink(req.files.video[0].path)
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

const uploadImagePost=async(req,res)=>{
    try {
        const {caption,tags,user,publicity,location}=req.body

        if(!req.files) {
            await Promise.all(
                req.files.map((item)=>fs.promises.unlink(item.path))
            )
            return res.status(400).json({ 
                message: "Thiếu image",
                data:[],
                success:false,
                error:false
            });
        }

        const existUser=await User.findById(user)
        if(!existUser){
            await Promise.all(
                req.files.map((item)=>fs.promises.unlink(item.path))
            )
            return res.status(400).json({
                message: "Không tìm thấy userID",
                data:[],
                success:false,
                error:false
            });
        }

        const imageUploadResult=await Promise.all(
            req.files.map(item=>{
                return cloudinary.uploader.upload(item.path,{
                    resource_type: "image",
                    folder: "toptop/images"
                })
            })
        )         

        await Promise.all(
            req.files.map((item)=>fs.promises.unlink(item.path))
        )

        const newPost=new Post({
            user,
            caption,
            tags:tags?JSON.parse(tags):[],
            type:'image',
            publicity:publicity,
            location:location,
            media:imageUploadResult.map(result=>result.secure_url)
        })

        await newPost.save()
        res.status(200).json({
            message:'upload ImagePost thành công',
            data:newPost,
            success:true,
            error:false
        })
    } catch (error) {
        console.log('Lỗi khi uploadImagePost: ',error);
        await Promise.all(
            req.files.map((item)=>fs.promises.unlink(item.path))
        )
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

const getAllPost=async(req,res)=>{
    try {
        const {page=1,limit=10}=req.body
        let data=await Post.find().skip((page-1)*limit).limit(limit)
        let totalItem=await Post.countDocuments()
        res.status(200).json({
            message:'Lấy tất cả post thành công',
            data:{
                data,
                totalItem
            },
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:{
                data:[],
                totalItem:0
            },
            success:false,
            error:true
        })
    }
}

const getAllPostByUser=async(req,res)=>{
    try {
        const {user}=req.params
        const existUser=await User.findById(user)
        if(!existUser){
            console.log("Không tìm thấy user:",user);
            return res.status(400).json({
                message:`Không tìm thấy user ${user}`,
                data:[],
                success:false,
                error:true
            })
        }

        let data=await Post.find({user}).sort({createdAt:-1})
        res.status(200).json({
            message:'Lấy post theo User thành công',
            data:data,
            success:true,
            error:false
        })
    } catch (error) {
        console.log("Lỗi khi lấy các post của user:",error);
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

const likePost=async(req,res)=>{
    try {
        const {user,postID}=req.body
        const existUser=await User.findById(user)
        if(!existUser){
            console.log("Không tìm thấy user:",user);
            return res.status(400).json({
                message:`Không tìm thấy user ${user}`,
                data:[],
                success:false,
                error:true
            })
        }

        const existPost=await Post.findById(postID)
        if(!existPost){
            console.log("Không tìm thấy post:",postID);
            return res.status(400).json({
                message:`Không tìm thấy post ${postID}`,
                data:[],
                success:false,
                error:false
            })
        }

        if(existPost.likeList.includes(user)){
            console.log("user đã like post rồi");
            return res.status(400).json({
                message:`user đã like post rồi`,
                data:[],
                success:false,
                error:true
            })
        }

        if(existUser.likePosts.includes(postID)){
            console.log("post đã có trong likePosts của user rồi");
            return res.status(400).json({
                message:'post đã có trong likePosts của user rồi',
                data:[],
                success:false,
                error:true
            })
        }

        existPost.likeList.push(user)
        existPost.numOfLikes+=1
        await existPost.save()
        existUser.likePosts.push(postID)
        await existUser.save()

        res.status(200).json({
            message:"like thành công",
            data:existPost,
            success:true,
            error:false
        })
    } catch (error) {
        console.log("Lỗi khi like post:",error);
        res.status(500).json({
            message:`Lỗi server ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}

const unLikePost = async (req, res) => {
    try {
        const { user, postID } = req.body;
        const existUser = await User.findById(user);
        if (!existUser) {
            console.log("Không tìm thấy user:", user);
            return res.status(400).json({
                message: `Không tìm thấy user ${user}`,
                data: [],
                success: false,
                error: true
            });
        }

        const existPost = await Post.findById(postID);
        if (!existPost) {
            console.log("Không tìm thấy post:", postID);
            return res.status(400).json({
                message: `Không tìm thấy post ${postID}`,
                data: [],
                success: false,
                error: true
            });
        }

        if (!existPost.likeList.includes(user)) {
            console.log("user chưa like post");
            return res.status(400).json({
                message: `user chưa like post`,
                data: [],
                success: false,
                error: true
            });
        }

        if (!existUser.likePosts.includes(postID)) {
            console.log("post chưa có trong likePosts của user");
            return res.status(400).json({
                message: 'post chưa có trong likePosts của user',
                data: [],
                success: false,
                error: true
            });
        }

        existPost.likeList = existPost.likeList.filter(item => item.toString() !== user);
        existPost.numOfLikes -= 1;
        await existPost.save();
        existUser.likePosts = existUser.likePosts.filter(item => item.toString() !== postID);
        await existUser.save();

        res.status(200).json({
            message: "unlike thành công",
            data: existPost,
            success: true,
            error: false
        });
    } catch (error) {
        console.log("Lỗi khi unlike post:", error);
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
};


const savePost = async (req, res) => {
    try {
        const { user, postID } = req.body;
        const existUser = await User.findById(user);
        if (!existUser) {
            return res.status(400).json({
                message: `Không tìm thấy user ${user}`,
                data: [],
                success: false,
                error: true
            });
        }

        const existPost = await Post.findById(postID);
        if (!existPost) {
            return res.status(400).json({
                message: `Không tìm thấy post ${postID}`,
                data: [],
                success: false,
                error: true
            });
        }

        if (existPost.saveList.includes(user)) {
            return res.status(400).json({
                message: `user đã save post rồi`,
                data: [],
                success: false,
                error: true
            });
        }

        if (existUser.savePosts.includes(postID)) {
            return res.status(400).json({
                message: 'post đã có trong savePosts của user rồi',
                data: [],
                success: false,
                error: true
            });
        }

        existPost.saveList.push(user);
        existPost.numOfSave += 1;
        await existPost.save();
        existUser.savePosts.push(postID);
        await existUser.save();

        res.status(200).json({
            message: "save thành công",
            data: existPost,
            success: true,
            error: false
        });
    } catch (error) {
        console.log("Lỗi khi save post:", error);
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
};


const unSavePost = async (req, res) => {
    try {
        const { user, postID } = req.body;
        const existUser = await User.findById(user);
        if (!existUser) {
            return res.status(400).json({
                message: `Không tìm thấy user ${user}`,
                data: [],
                success: false,
                error: true
            });
        }

        const existPost = await Post.findById(postID);
        if (!existPost) {
            return res.status(400).json({
                message: `Không tìm thấy post ${postID}`,
                data: [],
                success: false,
                error: true
            });
        }

        if (!existPost.saveList.includes(user)) {
            return res.status(400).json({
                message: `user chưa save post`,
                data: [],
                success: false,
                error: true
            });
        }

        if (!existUser.savePosts.includes(postID)) {
            return res.status(400).json({
                message: 'post chưa có trong savePosts của user',
                data: [],
                success: false,
                error: true
            });
        }

        existPost.saveList = existPost.saveList.filter(item => item.toString() !== user);
        existPost.numOfSave -= 1;
        await existPost.save();
        existUser.savePosts = existUser.savePosts.filter(item => item.toString() !== postID);
        await existUser.save();

        res.status(200).json({
            message: "unsave thành công",
            data: existPost,
            success: true,
            error: false
        });
    } catch (error) {
        console.log("Lỗi khi unsave post:", error);
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
};

const sharePost = async (req, res) => {
    try {
        const { user, postID } = req.body;
        const existUser = await User.findById(user);
        if (!existUser) {
            return res.status(400).json({
                message: `Không tìm thấy user ${user}`,
                data: [],
                success: false,
                error: true
            });
        }

        const existPost = await Post.findById(postID);
        if (!existPost) {
            return res.status(400).json({
                message: `Không tìm thấy post ${postID}`,
                data: [],
                success: false,
                error: true
            });
        }

        if (existPost.shareList.includes(user)) {
            return res.status(200).json({
                message: `user đã share rồi`,
                data: [],
                success: true,
                error: false
            });
        }

        existPost.shareList.push(user);
        existPost.numOfShare += 1;
        await existPost.save();

        res.status(200).json({
            message: "share thành công",
            data: existPost,
            success: true,
            error: false
        });
    } catch (error) {
        console.log("Lỗi khi share post:", error);
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
};

const getPostByID = async (req, res) => {
    try {
        const { postID } = req.params;
        const existPost = await Post.findById(postID);
        if (!existPost) {
            return res.status(400).json({
                message: `Không tìm thấy post ${postID}`,
                data: [],
                success: false,
                error: true
            });
        }

        res.status(200).json({
            message: 'Lấy post thành công',
            data: existPost,
            success: true,
            error: false
        });
    } catch (error) {
        console.log("Lỗi khi getPostById: ", error);
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
};
const importFile = async (req, res) => {
    try {
        const upload = multer({ dest: 'uploads/' }).single('file');

        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({
                    message: `Lỗi upload file: ${err}`,
                    data: [],
                    success: false,
                    error: true
                });
            }

            const file = req.file;
            if (!file) {
                return res.status(400).json({
                    message: "Không tìm thấy file",
                    data: [],
                    success: false,
                    error: true
                });
            }

            const filePath = file.path;
            const ext = path.extname(file.originalname).toLowerCase();

            if (ext === ".json") {
                try {
                    const data = fs.readFileSync(filePath, 'utf8');
                    const jsonData = JSON.parse(data);
                    const inserted = await Post.insertMany(jsonData); // 🔥 Dùng await

                    fs.unlink(filePath, () => {});
                    return res.status(200).json({
                        message: "Import file JSON thành công",
                        data: inserted,
                        success: true,
                        error: false
                    });
                } catch (error) {
                    fs.unlink(filePath, () => {});
                    return res.status(400).json({
                        message: `Lỗi đọc hoặc import file JSON: ${error}`,
                        data: [],
                        success: false,
                        error: true
                    });
                }
            } else if (ext === ".csv") {
                const results = [];
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => {
                        results.push(row);
                    })
                    .on('end', async () => {
                        fs.unlink(filePath, () => {});
                        try {
                            const inserted = await Post.insertMany(results);
                            return res.status(200).json({
                                message: "Import file CSV thành công",
                                data: inserted,
                                success: true,
                                error: false
                            });
                        } catch (err) {
                            fs.unlink(filePath, () => {});
                            return res.status(500).json({
                                message: `Lỗi khi import file CSV: ${err}`,
                                data: [],
                                success: false,
                                error: true
                            });
                        }
                    });
            } else {
                fs.unlink(filePath, () => {});
                return res.status(400).json({
                    message: "File không hợp lệ (chỉ hỗ trợ .json, .csv)",
                    data: [],
                    success: false,
                    error: true
                });
            }
        });

    } catch (error) {
        fs.unlink(filePath, () => {});
        return res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
};

module.exports={uploadVideoPost,uploadImagePost,getAllPost,getAllPostByUser,likePost,unLikePost,savePost,unSavePost,sharePost,getPostByID, importFile}