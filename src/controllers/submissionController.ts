import { Response } from 'express';
import { Submission } from '../models/Submission';
import { AuthRequest } from '../middlewares/authMiddleware';
import { generatePreliminaryFeedback } from '../lib/aiService';

// let's handle a student submitting their work, but first check if they already did it
export const submitAssignment = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { assignmentId, url, note } = req.body;

    const existingSubmission = await Submission.findOne({
      assignmentId,
      studentId: req.userId
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this assignment.' });
    }

    const newSubmission = new Submission({
      assignmentId,
      studentId: req.userId,
      url,
      note
    });
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    console.error('Submit Assignment Error:', error);
    res.status(500).json({ message: 'Error submitting assignment' });
  }
};

export const getSubmissionsByInstructor = async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await Submission.find()
      .populate('assignmentId', 'title')
      .populate('studentId', 'name email');
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Fetch Submissions Error:', error);
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

export const getStudentSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await Submission.find({ studentId: req.userId })
      .populate('assignmentId', 'title difficulty deadline');
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Fetch Student Submissions Error:', error);
    res.status(500).json({ message: 'Error fetching student submissions' });
  }
};

export const updateSubmissionStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      id,
      { status, feedback },
      { new: true }
    );
    res.status(200).json(submission);
  } catch (error) {
    console.error('Update Submission Error:', error);
    res.status(500).json({ message: 'Error updating submission' });
  }
};

// this is the cool part - generating some instant feedback for the student using AI
export const generateAIFeedback = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id).populate('assignmentId');
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    const assignment = submission.assignmentId as any;
    if (!assignment) return res.status(404).json({ message: 'Assignment not found for this submission' });

    const aiResponse = await generatePreliminaryFeedback(
      assignment.title,
      assignment.description,
      submission.note
    );


    submission.aiFeedback = aiResponse;
    await submission.save();

    res.status(200).json({ aiFeedback: aiResponse });
  } catch (error) {
    console.error('Generate AI Feedback Error:', error);
    res.status(500).json({ message: 'Error generating AI feedback' });
  }
};


