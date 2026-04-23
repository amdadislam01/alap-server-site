import mongoose from 'mongoose';

// Here's our user model. We keep it simple with email, password, role, and name.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['instructor', 'student'], default: 'student' },
  name: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
