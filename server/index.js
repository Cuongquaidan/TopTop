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
const MessageRoutes=require('./routes/MessageRoute')

const app=express()
app.use(cors())
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

    socket.on("sendMessage", (data)=>{
        io.emit("getMessage", data)
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