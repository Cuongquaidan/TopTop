const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');


router.get('/getAllChatsByUserId/:userId', MessageController.getAllChatsByUserId);
router.get("/getChat/:userId/:otherUserId", MessageController.getChat);
router.post('/sendMessage', MessageController.sendMessage);
router.delete('/deleteMessage/:messageId', MessageController.deleteMessage);

module.exports = router;