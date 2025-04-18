const mongoose=require('mongoose')
require('dotenv').config()

const connectMongo=async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('kết nối DB thành công '+mongoose.connection.host+' '+mongoose.connection.name)
        
    } catch (error) {
        console.log("lỗi kết nối DB:",error);
        process.exit(1)
    }
}
module.exports=connectMongo