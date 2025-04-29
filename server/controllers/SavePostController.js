
const SavePost = require('../models/SavePost');
const Post = require('../models/Post');

const handleClick = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        data: { userId, postId },
        message: "Post not found",
        success: false,
        error: true
      });
    }
    const existingSave = await SavePost.findOne({ userId, postId });
    if (existingSave) {
      await SavePost.findByIdAndDelete(existingSave._id);
      return res.status(200).json({
        data: { userId, postId },
        message: "Post unsaved successfully",
        success: true,
        error: false
      });
    }
    const newSave = new SavePost({
      userId,
      postId
    });
    const savedSave = await newSave.save();
    res.status(201).json({
      data: {
        userId: savedSave.userId,
        postId: savedSave.postId
      },
      message: "Post saved successfully",
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

const getSavedPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedPosts = await SavePost.find({ userId });
    res.status(200).json({
      data: savedPosts.map(save => ({
        userId: save.userId,
        postId: save.postId
      })),
      message: "Saved posts retrieved successfully",
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
  handleClick,
  getSavedPostsByUserId
}