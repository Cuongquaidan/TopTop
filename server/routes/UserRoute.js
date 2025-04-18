const express=require('express')
const router=express.Router()
const UserController=require('../controllers/UserController')
const uploadCloudinary = require('../middleware/uploadCloudinary')

router.post('/register',uploadCloudinary.single('profile_picture'),UserController.register)

module.exports=router