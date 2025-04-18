const express=require('express')
const router=express.Router()
const UserController=require('../controllers/UserController')
const uploadCloudinary = require('../middleware/uploadCloudinary')


router.get('/all',UserController.getAllUser)
router.get('/:userID',UserController.getUserByID)

module.exports=router