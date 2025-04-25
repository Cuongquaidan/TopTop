const LikeComment = require('../models/LikeComment');
const Comment = require('../models/Comment');
const clickLikeComment = async (req, res) => {
  try {
    const { userId, commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
        error: true
      });
    }
    const existingLike = await LikeComment.findOne({ userId, commentId });

    if (existingLike) {
      await LikeComment.findByIdAndDelete(existingLike._id);
      await Comment.findByIdAndUpdate(commentId, { $inc: { numOfLikes: -1 } }, { new: true });
      return res.status(200).json({
        message: "Comment unliked successfully",
        success: true,
        error: false
      });
    }

    const newLike = new LikeComment({
      userId,
      commentId
    });

    const savedLike = await newLike.save();
    await Comment.findByIdAndUpdate(commentId, { $inc: { numOfLikes: 1 } }, { new: true });

    res.status(201).json({
      data: savedLike,
      message: "Comment liked successfully",
      success: true,
      error: false
    });
  }catch (error) {
    res.status(500).json({
      data:[],
      message: "Internal server error",
      success: false,
      error: true
    });
  }
}

module.exports = {
  clickLikeComment,
};