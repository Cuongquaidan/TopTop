const express=require('express')
const router=express.Router()
const ReportController=require('../controllers/ReportController')

router.get('/',ReportController.getAllReport)
router.post('/',ReportController.postReport)

module.exports=router