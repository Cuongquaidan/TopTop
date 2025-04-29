const Comment = require("../models/Comment")


const createComment = async (req,res)=>{
  try {
    const { postId, content, userId,parentId } = req.body;

    const newComment = new Comment({
      postId,
      userId,
      parentId: parentId || null,
      content,
    });

    await newComment.save();

    res.status(201).json({
      data: newComment,
      message: "Comment created successfully",
      success: true,
      error: false
    });
  }
  catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getCommentsByPostId = async (req,res)=>{
  try {
    const { postId } = req.params;
    console.log("Fetching comments for postId:", postId);
    const comments = await Comment.find({ postId }).populate("userId", "username profile_picture _id display_name").sort({ createdAt: -1 });
    res.status(200).json({
      data: comments,
      message: "Comments retrieved successfully",
      success: true,
      error: false
    });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


const deleteComment = async (req,res)=>{
  
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
        error: true
      });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({
        data: [],
        message: "Comment deleted successfully",
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
  createComment,
  getCommentsByPostId,
  deleteComment
}

   