const { countDocuments } = require("../models/Post");
const User = require("../models/User")
const fs=require('fs')
const multer=require('multer')
const path=require('path')
const cloudinary=require('../services/cloudinary');

const getAllUser = async (req, res) => {
    try {
        const {page=1,limit=10}=req.body
        const data = await User.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1}).populate("followers").populate("followeds").populate("likeUsers").populate('friends');
        let totalItem=await User.countDocuments()
        res.status(200).json({
            message: "Lấy danh sách người dùng theo page và limit thành công",
            data: {
                data,
                totalItem
            },
            success: true,
            error: false
        });const getFamousdUser=async(req,res)=>{
            try {
                const {user}=req.body
                const data = await User.find({state:active}).sort({numOfFollowers:-1});
                res.status(200).json({
                    message: "Lấy danh sách người dùng nổi tiếng thành công",
                    data,
                    success: true,
                    error: false
                });
            } catch (error) {
                res.status(500).json({
                    message: `Lỗi server: ${error}`,
                    data: [],
                    success: false,
                    error: true
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: {
                data:[],
                totalItem:0
            },
            success: false,
            error: true
        });
    }
};

const getUserByID = async (req, res) => {
    try {
        const { userID } = req.params;
        const existUser = await User.findById(userID).populate("followers").populate("followeds").populate("likeUsers").populate('friends');
        if (!existUser) {
            console.log("Không tìm thấy userID:", userID);
            return res.status(400).json({
                message: `Không tìm thấy userID ${userID}`,
                data: [],
                success: false,
                error: false
            });
        }

        res.status(200).json({
            message: "Lấy thông tin người dùng thành công",
            data: existUser,
            success: true,
            error: false
        });
    } catch (error) {
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
                    const data = fs.readFileync(filePath, 'utf8');
                    const jsonData = JSON.parse(data);
                    const inserted = await User.insertMany(jsonData); // 🔥 Dùng await

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
                            const inserted = await User.insertMany(results);
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

const getFamousdUser=async(req,res)=>{
    try {
        const {user}=req.body
        
        const data = await User.find({state:"active",_id:{$ne:user._id}}).sort({numOfFollowers:-1}).limit(20);
        res.status(200).json({
            message: "Lấy danh sách người dùng nổi tiếng thành công",
            data,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
}

const updateUser=async(req,res)=>{
    try {
        const {user,...updateFields}=req.body
        
        if(!user){
            return res.status(400).json({
                message: `Thiếu user`,
                data: [],
                success: false,
                error: false
            });
        }

        const updatedUser=await User.findByIdAndUpdate(
            user._id,
            {$set:updateFields},
            {new:true}
        )

        if(!updatedUser){
            return res.status(404).json({
                message: `không tìm thấy user`,
                data: [],
                success: false,
                error: false
            });
        }
        
        res.status(200).json({
            message: `Update user thành công`,
            data: updatedUser,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
}

const updateProfilePicture=async(req,res)=>{
    try {
        const {userID}=req.body
        
        if(!req.file){
            return res.status(400).json({
                message: `Thiếu ảnh`,
                data: [],
                success: false,
                error: true
            });
        }

        const user=await User.findById(userID)
        if(!user){
            await fs.promises.unlink(req.file.path)
            return res.status(404).json({
                message: `không tìm thấy user ${userID}`,
                data: [],
                success: false,
                error: true
            });
        }
        
        const imageUploadResult=await cloudinary.uploader.upload(req.file.path,{
            resource_type: "image",
            folder: "toptop/images"
        })
        
        user.profile_picture=imageUploadResult.secure_url
        await user.save()

        await fs.promises.unlink(req.file.path)
        res.status(200).json({
            message: `Update profile_picture thành công`,
            data: user,
            success: true,
            error: false
        });
    } catch (error) {
        await fs.promises.unlink(req.file.path)
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
}

const getListBasicInfoByListID=async(req,res)=>{
    try {
        const {listID}=req.body
        
        if(!listID || listID.length===0){
            return res.status(400).json({
                message: `Thiếu listID`,
                data: [],
                success: false,
                error: false
            });
        }

        const users=await User.find({_id:{$in:listID}}).select("username _id display_name profile_picture blue_tick")
        
        res.status(200).json({
            message: `Lấy danh sách thông tin cơ bản thành công`,
            data: users,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: `Lỗi server: ${error}`,
            data: [],
            success: false,
            error: true
        });
    }
}
module.exports={getAllUser,getUserByID,importFile,getFamousdUser,updateUser,updateProfilePicture, getListBasicInfoByListID}