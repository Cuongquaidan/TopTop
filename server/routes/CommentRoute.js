const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router.post('/create', CommentController.createComment);
router.get('/post/:postId', CommentController.getCommentsByPostId);
router.delete('/delete/:commentId', CommentController.deleteComment);

module.exports = router;