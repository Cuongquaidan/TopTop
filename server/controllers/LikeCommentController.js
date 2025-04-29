const LikeComment = require('../models/LikeComment');
const Comment = require('../models/Comment');
const clickLikeComment = async (req, res) => {
  try {
    const { userId, commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        data: {userId, commentId},
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
        data: {userId, commentId},
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
      data: {
        userId: savedLike.userId,
        commentId: savedLike.commentId
      },
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

const getLikesByUserId = async (req, res) => {
  
  try {
    const { userId } = req.params;
    const likes = await LikeComment.find({ userId });
    res.status(200).json({
      data: likes.map(like => ({
        commentId: like.commentId,
        userId: like.userId
      })),
      message: "Likes retrieved successfully",
      success: true,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Internal server error",
      success: false,
      error: true
    });
  }
}

module.exports = {
  clickLikeComment,
  getLikesByUserId
};