const mongoose = require('mongoose');

const SavePostSchema = new mongoose.Schema({
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

const SharePost = mongoose.model('SavePost', SavePostSchema);
module.exports = SharePost;