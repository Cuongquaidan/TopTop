
const Report = require('../models/Report');
const fs=require('fs')
const multer=require('multer')
const path=require('path')

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
                    const inserted = await Report.insertMany(jsonData); // 🔥 Dùng await

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
                            const inserted = await Report.insertMany(results);
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


const getAllReport=async(req,res)=>{
    try {
        const {page=1,limit=10}=req.body
        const data=await Report.find().skip((page-1)*limit).limit(limit).populate("reporter").populate("reportedUser").populate("reportedPost").populate("reviewedBy").sort({createdAt:-1})
        let totalItem=await Report.countDocuments()
        res.status(200).json({
            message:'getAllReport với page và limit thành công',
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

const postReport=async(req,res)=>{
    try {
        const {reporter,reportedUser,reportedPost,reason,description}=req.body
        if(!reporter||!reportedUser||!reportedPost){
            return res.status(400).json({
                message:"Thiếu reporter/reportedUser/reportedPost",
                data:[],
                success:false,
                error:false
            })
        }

        const newReport=new Report({
            reporter,
            reportedUser,
            reportedPost,
            reason
        })
        await newReport.save()
        res.status(200).json({
            message:"Report thành công",
            data:newReport,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message:`Lỗi server: ${error}`,
            data:[],
            success:false,
            error:true
        })
    }
}
module.exports={getAllReport,postReport, importFile}