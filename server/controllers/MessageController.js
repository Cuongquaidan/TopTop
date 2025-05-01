const getAllMessagesInSinglechat = async (req, res) => {
  try {
    const {senderId, receiverId} = req.body;
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ timestamp: 1 });
    res.status(200).json({
      success: true,
      data: messages,
      message: 'Messages fetched successfully',
      error: false
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      data:[],
      message: 'Internal server error',
      error: true
    });
  }
}

const saveMessage = async (message) => {
  try {
    
    const { senderId, receiverId, content } = message;
    if(!senderId || !receiverId || !content) {
      throw new Error('Missing required fields');
    }
    const checkSender = await User.findById(senderId);
    const checkReceiver = await User.findById(receiverId);
    if(!checkSender || !checkReceiver) {
      throw new Error('Sender or receiver not found');
    }
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content: content,
      timestamp: Date.now()
    });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
}

module.exports = {
  getAllMessagesInSinglechat,
  saveMessage
}