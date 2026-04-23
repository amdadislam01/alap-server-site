import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import submissionRoutes from './routes/submissionRoutes';
import analyticsRoutes from './routes/analyticsRoutes';


const app = express();
const PORT = process.env.PORT || 5000;

// setting up basic middleware like CORS and JSON parsing
app.use(cors());
app.use(express.json());

// let's get the database connection going
connectDB();

// defining our main API routes
app.get('/', (req, res) => {
  res.send('ALAP API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
