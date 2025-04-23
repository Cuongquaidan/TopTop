const express = require('express');
const router = express.Router();

const ReportController = require('../controllers/ReportController');

router.post("/import", ReportController.importFile);

module.exports = router;