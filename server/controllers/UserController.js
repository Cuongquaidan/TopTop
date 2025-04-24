const { countDocuments } = require("../models/Post");
const User = require("../models/User")
const fs=require('fs')
const multer=require('multer')
const path=require('path')

const getAllUser = async (req, res) => {
    try {
        const {page=1,limit=10}=req.body
        const data = await User.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1});
        let totalItem=await User.countDocuments()
        res.status(200).json({
            message: "Lấy danh sách người dùng theo page và limit thành công",
            data: {
                data,
                totalItem
            },
            success: true,
            error: false
        });
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
        const existUser = await User.findById(userID);
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
                    const data = fs.readFileSync(filePath, 'utf8');
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

module.exports={getAllUser,getUserByID,importFile}

