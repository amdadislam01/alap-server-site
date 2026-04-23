import mongoose from 'mongoose';

// This tracks student submissions. 
// We store the link to their work, their notes, and any feedback (human or AI).
const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  note: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Pending', 'Needs Improvement'], default: 'Pending' },
  feedback: { type: String, default: '' },
  aiFeedback: { type: String, default: '' },
}, { timestamps: true });


export const Submission = mongoose.model('Submission', submissionSchema);
