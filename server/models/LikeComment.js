const mongoose = require('mongoose');

const LikeCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
},{
  timestamps: true
})

const LikeComment = mongoose.model('LikeComment', LikeCommentSchema);

module.exports = LikeComment;