const express = require('express');
const router = express.Router();
const LikeCommentController = require('../controllers/LikeCommentController');


router.post('/click', LikeCommentController.clickLikeComment);
router.get('/user/:userId', LikeCommentController.getLikesByUserId);

module.exports = router;