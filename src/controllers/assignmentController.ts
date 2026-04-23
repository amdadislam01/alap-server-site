import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { AuthRequest } from '../middlewares/authMiddleware';
import { refineAssignmentDescription } from '../lib/aiService';

// This one handles creating a new assignment and saving it to the database.
export const createAssignment = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, deadline, difficulty } = req.body;
    const newAssignment = new Assignment({
      title,
      description,
      deadline,
      difficulty,
      instructorId: req.userId
    });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Create Assignment Error:', error);
    res.status(500).json({ message: 'Error creating assignment' });
  }
};

// Fetching all assignments and making sure we include the instructor's name.
export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().populate('instructorId', 'name');
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Fetch Assignments Error:', error);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
};

export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(assignment);
  } catch (error) {
    console.error('Fetch Assignment Error:', error);
    res.status(500).json({ message: 'Error fetching assignment' });
  }
};

// Using Gemini AI to make the assignment description look more professional.
export const refineDescription = async (req: AuthRequest, res: Response) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    const refined = await refineAssignmentDescription(description);
    res.status(200).json({ refined });
  } catch (error) {
    console.error('Refine Description Error:', error);
    res.status(500).json({ message: 'Error refining description' });
  }
};


