const express=require('express')
const router=express.Router()
const PostController=require('../controllers/PostController')
const uploadCloudinary = require('../middleware/uploadCloudinary')

router.post('/upload/video',uploadCloudinary.uploadVideo,PostController.uploadVideoPost)
router.post('/upload/image',uploadCloudinary.uploadImage,PostController.uploadImagePost)
router.get('/all',PostController.getAllPost)
router.get('/ID/:postID',PostController.getPostByID)
router.get('/user/:user',PostController.getAllPostByUser)
router.put('/like',PostController.likePost)
router.put('/unlike',PostController.unLikePost)
router.put('/save',PostController.savePost)
router.put('/unsave',PostController.unSavePost)
router.put('/share',PostController.sharePost)
router.post('/import',PostController.importFile)

module.exports=router