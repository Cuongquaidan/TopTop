const User = require("../models/User")


const getAllUser = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json({
            message: "Lấy tất cả người dùng thành công",
            data: data,
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

module.exports={getAllUser,getUserByID}

