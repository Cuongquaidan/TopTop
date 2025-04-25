const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router.post('/create', CommentController.createComment);
router.get('/post/:postId', CommentController.getCommentsByPostId);
router.post('/reply/:parentId', CommentController.replyComment);
router.delete('/delete/:commentId', CommentController.deleteComment);

module.exports = router;