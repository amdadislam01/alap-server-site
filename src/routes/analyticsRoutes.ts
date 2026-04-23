import express from 'express';
import { getInstructorAnalytics } from '../controllers/analyticsController';
import auth, { checkRole } from '../middlewares/authMiddleware';

const router = express.Router();

// everything here is for getting statistics and data insights for instructors
router.get('/instructor', auth, checkRole('instructor'), getInstructorAnalytics);

export default router;
