import express from 'express';
import { createAssignment, getAssignments, getAssignmentById, refineDescription } from '../controllers/assignmentController';
import auth, { checkRole } from '../middlewares/authMiddleware';

const router = express.Router();

// these routes handle fetching, creating, and refining assignments
router.get('/', auth, getAssignments);
router.get('/:id', auth, getAssignmentById);
router.post('/', auth, checkRole('instructor'), createAssignment);
router.post('/refine', auth, refineDescription);

export default router;
