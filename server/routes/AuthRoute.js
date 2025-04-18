const express=require('express')
const AuthController=require('../controllers/AuthController')
const uploadCloudinary = require('../middleware/uploadCloudinary')
const router=express.Router()

router.post('/register',AuthController.register)
router.post('/login/email',AuthController.loginEmail)
router.post('/login/phone',AuthController.loginPhone)
router.post("/register",AuthController.register)

module.exports=router