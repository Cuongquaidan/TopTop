const express=require('express')
const AuthController=require('../controllers/authController')
const uploadCloudinary = require('../middleware/uploadCloudinary')
const router=express.Router()

router.post('/register',AuthController.register)
router.post('/login/other',AuthController.loginOther)
router.post('/login/phone',AuthController.loginPhone)
router.post("/register",AuthController.register)

module.exports=router