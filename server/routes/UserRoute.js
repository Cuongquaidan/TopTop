const express=require('express')
const router=express.Router()
const UserController=require('../controllers/UserController')
const uploadCloudinary = require('../middleware/uploadCloudinary')


router.post('/all',UserController.getAllUser)
router.get('/:userID',UserController.getUserByID)
router.post('/famous',UserController.getFamousdUser)
router.post('/import',UserController.importFile)
router.put('/update',UserController.updateUser)
router.put('/updateProfilePicture',uploadCloudinary.uploadSingleImage,UserController.updateProfilePicture)
module.exports=router