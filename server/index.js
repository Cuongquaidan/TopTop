const express=require('express')
const cors=require('cors')
const connectMongo = require('./services/mongooseConnect')
const { Server } = require("socket.io");
const http = require("http");
require('dotenv').config()
const UserRoutes=require('./routes/UserRoute')
const AuthRoutes=require('./routes/AuthRoute')
const ReportRoutes=require('./routes/ReportRoute')
const PostRoutes=require('./routes/PostRoute')
const CommentRoutes=require('./routes/CommentRoute')
const LikeCommentRoutes=require('./routes/LikeCommentRoute')
const LikePostRoutes=require('./routes/LikePostRoute')
const SavePostRoutes=require('./routes/SavePostRoute')
const MessageRoutes=require('./routes/MessageRoute');
const Message = require('./models/Message');

const app=express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
})

io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);

    socket.on("join", userId =>{
        socket.join(userId)
        console.log("User joined", userId);
    })

    socket.on("sendMessage", (data)=>{
        const {receiver} = data
        const receiverId = receiver._id
        io.to(receiverId).emit("getMessage", data)
    })
    socket.on("readMessage", async ({senderId, receiverId})=>{
         try {
            await Message.updateMany(
                { sender: senderId, receiver: receiverId, isRead: false },
                { $set: { isRead: true } }
            );
         } catch (error) {
            console.error("Error updating messages:", error);
         }
    })

    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id);
    })
})

connectMongo()

app.use('/user',UserRoutes)
app.use('/auth',AuthRoutes)
app.use('/post',PostRoutes)
app.use('/report',ReportRoutes)
app.use('/comment',CommentRoutes)
app.use('/likeComment',LikeCommentRoutes)
app.use('/likePost',LikePostRoutes)
app.use('/savePost',SavePostRoutes)
app.use('/messages',MessageRoutes)


const PORT=process.env.PORT||5000
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}) 