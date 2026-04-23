import { Response } from 'express';
import { Submission } from '../models/Submission';
import { Assignment } from '../models/Assignment';
import { User } from '../models/User';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getInstructorAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const totalAssignments = await Assignment.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    const totalStudents = await User.countDocuments({ role: { $regex: /student/i } });
    
    // let's see how many submissions are in each status (pending, approved, etc.)
    const statusDistribution = await Submission.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // now let's group our assignments by their difficulty levels
    const difficultyDistribution = await Assignment.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      totalAssignments,
      totalSubmissions,
      totalStudents,
      statusDistribution,
      difficultyDistribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};
