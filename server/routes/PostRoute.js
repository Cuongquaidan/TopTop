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
router.get('/:postID',PostController.getPostByID)
router.get('/:user',PostController.getAllPostByUser)
router.put('/like',PostController.likePost)
router.put('/unlike',PostController.unLikePost)
router.put('/save',PostController.savePost)
router.put('/unsave',PostController.unSavePost)
router.put('/share',PostController.sharePost)

module.exports=router