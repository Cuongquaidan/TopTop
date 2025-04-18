const express=require('express')
const cors=require('cors')
const connectMongo = require('./services/mongooseConnect')
require('dotenv').config()
const UserRoutes=require('./routes/UserRoute')
const AuthRoutes=require('./routes/AuthRoute')
const PostRoute=require('./routes/PostRoute')

const app=express()
app.use(cors())
app.use(express.json())

connectMongo()

app.use('/user',UserRoutes)
app.use('/auth',AuthRoutes)
app.use('/post',PostRoute)

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}) 