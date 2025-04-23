const Report = require("../models/Report")
const { report } = require("../routes/PostRoute")

const getAllReport=async(req,res)=>{
    try {
        const {page=1,limit=10}=req.body
        const data=await Report.find().skip((page-1)*limit).limit(limit)
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
module.exports={getAllReport,postReport}