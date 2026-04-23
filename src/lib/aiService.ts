import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// this helper sets up our connection to the Google Gemini API
const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables");
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-flash-latest" });
};



// this function takes a messy assignment description and makes it look professional
export const refineAssignmentDescription = async (originalDescription: string): Promise<string> => {
  const model = getModel();
  if (!model) {
    return originalDescription + "\n\n[Note: AI Refinement unavailable - API Key missing]";
  }

  const prompt = `
    You are an expert academic advisor. Refine the following assignment description to be more professional, 
    clear, and structured. Use Markdown for formatting. Ensure the learning objectives are explicit.
    
    Original Description:
    ${originalDescription}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Refinement Error:", error);
    throw new Error("Failed to refine description");
  }
};

// giving students some quick, automated feedback so they don't have to wait for the instructor
export const generatePreliminaryFeedback = async (assignmentTitle: string, assignmentDescription: string, studentNote: string): Promise<string> => {
  const model = getModel();
  if (!model) {
    return "AI Feedback unavailable - API Key missing. Please wait for instructor review.";
  }

  const prompt = `
    You are a teaching assistant. Provide a short, encouraging preliminary feedback for a student's submission 
    based on the assignment requirements and their submission note. 
    
    Assignment Title: ${assignmentTitle}
    Assignment Requirements: ${assignmentDescription}
    Student Submission Note: ${studentNote}
    
    Provide actionable advice and highlight if they seem to have addressed the main goals. Keep it under 150 words.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Feedback Error:", error);
    throw new Error("Failed to generate feedback");
  }
};
