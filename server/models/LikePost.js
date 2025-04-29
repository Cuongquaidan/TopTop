const mongoose = require('mongoose');

const LikePostSchema = new mongoose.Schema({
  postId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

},{
  timestamps:true
});

const LikePost = mongoose.model('LikePost', LikePostSchema);
module.exports = LikePost;