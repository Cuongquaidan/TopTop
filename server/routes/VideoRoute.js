const express=require('express')
const router=express.Router()
const VideoController=require('../controllers/VideoController')
const uploadCloudinary = require('../middleware/uploadCloudinary')

router.post(
    '/upload',
    uploadCloudinary.fields([
        {name:"video",maxCount:1},
        {name:"thumbnail",maxCount:1}
    ]),
    VideoController.uploadVideo
)
router.get('/all',VideoController.getAllVideo)

module.exports=router