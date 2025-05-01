const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');
router.get('/single', MessageController.getAllMessagesInSinglechat);

module.exports = router;