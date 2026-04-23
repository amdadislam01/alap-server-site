import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// This function handles our connection to MongoDB using Mongoose.
// We make sure to check if the URI exists before trying to connect.
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
