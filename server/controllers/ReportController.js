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

module.exports = {
    importFile,
};