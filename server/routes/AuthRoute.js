const express=require('express')
const AuthController=require('../controllers/AuthController')
const router=express.Router()

router.post('/register',AuthController.register)
router.post('/login/email',AuthController.loginEmail)
router.post('/login/phone',AuthController.loginPhone)

module.exports=router