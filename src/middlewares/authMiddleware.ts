import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

// this middleware checks if the user is logged in by verifying their JWT token
const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
    req.userId = decodedData.id;
    req.userRole = decodedData.role;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// a handy helper to restrict routes based on user roles (like "instructor" or "student")
export const checkRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userRole?.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

export default auth;
