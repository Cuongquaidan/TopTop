const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },

  numOfLikes:{
    type: Number,
    default: 0
  },
  parentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replyCount:{
    type: Number,
    default: 0
  },
  isDeleted:{
    type: Boolean,
    default: false
  },
  isPinned:{
    type: Boolean,
    default: false
  },
  deletedAt:{
    type: Date,
    default: null
  },

},{
  timestamps: true
})


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;