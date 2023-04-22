import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/video.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("connected to DB");
    }).catch((err) => {
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

app.use('/',(req,res)=>{
    res.send({message:"hello world"})
})

app.use((err, req, res, next)=>{
    const status = err.status || 500
    const message = err.message ||"Something went wrong!";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

app.listen(8080, () => {
    connect()
    console.log(`your app is running on http://localhost:8080`);
})