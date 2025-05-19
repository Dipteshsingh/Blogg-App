import mongoose from 'mongoose'

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URl)
    console.log('MongoDB connected');
    
  } catch (error) {
    console.error('DB connection failed',error);
    
  }
}
export default connectDB;