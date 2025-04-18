const express=require('express')
const router=express.Router()
const PostController=require('../controllers/PostController')
const uploadCloudinary = require('../middleware/uploadCloudinary')

router.post(
    '/upload',
    uploadCloudinary.fields([
        {name:"video",maxCount:1},
        {name:"thumbnail",maxCount:1}
    ]),
    PostController.uploadPost
)
router.get('/all',PostController.getAllPost)

module.exports=router