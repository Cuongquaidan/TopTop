
const express = require('express');
const router = express.Router();

const ReportController = require('../controllers/ReportController');

router.post("/import", ReportController.importFile);

router.get('/',ReportController.getAllReport)
router.post('/',ReportController.postReport)

module.exports=router

