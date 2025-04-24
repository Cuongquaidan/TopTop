const express=require('express')
const router=express.Router()
const UserController=require('../controllers/UserController')
const uploadCloudinary = require('../middleware/uploadCloudinary')


router.post('/all',UserController.getAllUser)
router.get('/:userID',UserController.getUserByID)
router.post('/import',UserController.importFile)

module.exports=router