const Post = require("../models/Post");
const LikePost = require("../models/LikePost");


const handleClick = async (req,res)=>{
  try {
    const { userId, postId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        data: {userId, postId},
        message: "Post not found",
        success: false,
        error: true
      });
    }
    const existingLike = await LikePost.findOne({ userId, postId });
    if(existingLike) {
      await LikePost.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, { $inc: { numOfLikes: -1 } }, { new: true });
      return res.status(200).json({
        data: {userId, postId},
        message: "Post unliked successfully",
        success: true,
        error: false
      });
    }
    const newLike = new LikePost({
      userId,
      postId
    });
    const savedLike = await newLike.save();
    await Post.findByIdAndUpdate(postId, { $inc: { numOfLikes: 1 } }, { new: true });
    res.status(201).json({
      data: {
        userId: savedLike.userId,
        postId: savedLike.postId
      },
      message: "Post liked successfully",
      success: true,
      error: false
    });
    
    
  } catch (error) {
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
    const likes = await LikePost.find({ userId });
    res.status(200).json({
      data: likes.map(like => ({
        userId: like.userId,
        postId: like.postId
      })),
      message: "Likes fetched successfully",
      success: true,
      error: false
    });
  }
  catch (error) {
    res.status(500).json({
      data:[],
      message: "Internal server error",
      success: false,
      error: true
    });
  }
}


module.exports = {
  handleClick,
  getLikesByUserId
};
