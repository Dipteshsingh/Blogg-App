import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cors from 'cors'
import path from 'path'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// api end points


app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)


app.use('/uploads', express.static( 'uploads'));

app.get('/',(req,res)=>{
  res.send('working')
})

// db connection------
connectDB();

app.listen(3000,()=>{
  console.log(`Server is running on port ${PORT}`);
  
})