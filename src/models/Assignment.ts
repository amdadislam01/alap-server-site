import mongoose from 'mongoose';

// This is the blueprint for our assignments. 
// We track basic info like title, description, and when it's due.
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Assignment = mongoose.model('Assignment', assignmentSchema);
