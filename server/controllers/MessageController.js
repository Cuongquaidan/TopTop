
const Message = require('../models/Message');
const User = require('../models/User');
const mongoose = require('mongoose');
const getAllChatsByUserId = async (req,res)=>{
  const {userId} = req.params;
  const objectUserId = new mongoose.Types.ObjectId(userId);
  try {
    const user = await User.findById(objectUserId);
    if(!user){
      return res.status(404).json({
        data:[],
        message:"User not found",
        success:false,
        error:true
      })
    }
    const messages = await Message.aggregate([
      {
        $match:{
          $or:[
            {sender:objectUserId},
            {receiver:objectUserId}
          ]
        }
      },
      {
        $project: {
          sender: 1,
          receiver: 1,
          content: 1,
          createdAt: 1,
         otherUser: {
          $cond: [
            { $eq: ["$sender", objectUserId] }, // Nếu mình là người gửi
               "$receiver",                        // → thì người còn lại là người nhận
               "$sender"                           // Ngược lại thì người còn lại là người gửi
         ]
        }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group:{
          _id: "$otherUser",
          lastMessage: {$first: "$$ROOT"}
        }
      },{
        $lookup:{
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "otherUser"
        }
      },{
        $unwind: "$otherUser"
      },
      {
        $project: {
          _id: 0,
          user: {
            _id: "$otherUser._id",
            username: "$otherUser.username",
            display_name: "$otherUser.display_name",
            profile_picture: "$otherUser.profile_picture",
            blue_tick: "$otherUser.blue_tick"
          },
          message: "$lastMessage"
        }
      }
    ])
    if(messages.length === 0){
      return res.status(200).json({
        data:[],
        message:"You have no messages",
        success:true,
        error:false
      })
    }
    return res.status(200).json({
      data:messages,
      message:"Get all messages successfully",
      success:true,
      error:false
    })
  } catch (error) {
    return res.status(500)
    .json({
      data:[],
      message:"Internal server error",
      success:false,
      error:true
    })
    
  }
}

const getChat = async (req,res)=>{
  const {userId,otherUserId} = req.params;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        data:[],
        message:"User not found",
        success:false,
        error:true
      })
    }
    const otherUser = await User.findById(otherUserId);
    if(!otherUser){
      return res.status(404).json({
        data:[],
        message:"Other user not found",
        success:false,
        error:true
      })
    }
    const messages = await Message.find({
      $or:[
        {
          $and:[
            {sender:userId},
            {receiver:otherUserId}
          ]
        },
        {
          $and:[
            {sender:otherUserId},
            {receiver:userId}
          ]
        }
      ]
    }).sort({createdAt:-1}).populate('sender receiver', 'username display_name profile_picture blue_tick');
    if(messages.length === 0){
      res.status(200).json({
        data:[],
        message:"You have no messages",
        success:true,
        error:false
      })
    }
    res.status(200).json({
      data:messages,
      message:"Get all messages successfully",
      success:true,
      error:false
    })
  } catch (error) {
    res.status(500)
    .json({
      data:[],
      message:"Internal server error",
      success:false,
      error:true
    })
    
  }
}


const sendMessage = async (req,res)=>{
  const {sender,receiver,content} = req.body;
  try {
    const user = await User.findById(sender);
    if(!user){
      return res.status(404).json({
        data:[],
        message:"User not found",
        success:false,
        error:true
      })
    }
    const otherUser = await User.findById(receiver);
    if(!otherUser){
      return res.status(404).json({
        data:[],
        message:"Other user not found",
        success:false,
        error:true
      })
    }
    const message = new Message({
      sender,
      receiver,
      content
    })
    await message.save();
    res.status(200).json({
      data:message,
      message:"Send message successfully",
      success:true,
      error:false
    })
  } catch (error) {
    res.status(500)
    .json({
      data:[],
      message:"Internal server error",
      success:false,
      error:true
    })
    
  }
}

const deleteMessage = async (req,res)=>{
  const {messageId} = req.params;
  try {
    const message = await Message.findById(messageId);
    if(!message){
      return res.status(404).json({
        data:[],
        message:"Message not found",
        success:false,
        error:true
      })
    }
    await message.deleteOne();
    res.status(200).json({
      data:message,
      message:"Delete message successfully",
      success:true,
      error:false
    })
  }
  catch (error) {
    res.status(500)
    .json({
      data:[],
      message:"Internal server error",
      success:false,
      error:true
    })
    
  }
}


module.exports = {
  getAllChatsByUserId,
  getChat,
  sendMessage,
  deleteMessage
}