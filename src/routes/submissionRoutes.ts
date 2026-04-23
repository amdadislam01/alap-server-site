import express from 'express';
import { 
  submitAssignment, 
  getSubmissionsByInstructor, 
  getStudentSubmissions, 
  updateSubmissionStatus,
  generateAIFeedback
} from '../controllers/submissionController';
import auth, { checkRole } from '../middlewares/authMiddleware';

const router = express.Router();

// routes for students to submit work and instructors to review it
router.post('/', auth, checkRole('student'), submitAssignment);
router.get('/student', auth, checkRole('student'), getStudentSubmissions);
router.get('/instructor', auth, checkRole('instructor'), getSubmissionsByInstructor);
router.patch('/:id', auth, checkRole('instructor'), updateSubmissionStatus);
router.post('/:id/ai-feedback', auth, generateAIFeedback);

export default router;

