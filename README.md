# ALAP Server (Assignment & Learning Analytics Platform)

Welcome to the backend core of **ALAP**. This server acts as the central nervous system for our learning platform, handling everything from secure student authentication to advanced AI-driven assignment analysis.

Built with performance, scalability, and developer experience in mind, this backend leverages **TypeScript** and **Express** to provide a robust API for the ALAP ecosystem.

---

## 🌟 Key Features

- **🔐 Secure Authentication**: Multi-role authentication (Student/Instructor) powered by JWT and bcrypt.
- **📚 Assignment Lifecycle**: Full CRUD operations for assignments, including status tracking and role-based access.
- **🤖 AI-Powered Intelligence**: Integration with **Google Gemini Flash 1.5** to:
  - Refine messy assignment descriptions into professional academic briefs.
  - Provide instant, preliminary feedback to students upon submission.
- **📊 Learning Analytics**: Real-time aggregation of submission statuses, student participation, and assignment difficulty distributions to provide deep insights for instructors.
- **⚡ Performance-First Design**: Optimized MongoDB queries and structured middleware for error handling and validation.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **AI Engine**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Security**: JWT (JSON Web Tokens), CORS, and password hashing.

---

## 📂 Project Structure

The codebase follows a clean, modular structure to ensure maintainability:

```text
src/
├── config/       # Database and environment configurations
├── controllers/  # Business logic and request handlers
├── lib/          # External services (Gemini AI service)
├── middlewares/  # Auth, role-checks, and error handlers
├── models/       # Mongoose schemas (User, Assignment, Submission)
├── routes/       # API route definitions
└── index.ts      # Server entry point
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- A MongoDB instance (local or Atlas)
- A Google AI Studio API Key (for Gemini features)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_key
NODE_ENV=development
```

### 4. Running the Server
```bash
# Development mode (with hot-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 📡 API Overview

| Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | User registration and secure login |
| **Assignments** | `/api/assignments` | Management and AI refinement of tasks |
| **Submissions** | `/api/submissions` | Student submission handling & instant feedback |
| **Analytics** | `/api/analytics` | Statistical data for instructors |

---

## 🤖 AI Integration Details

We use the `gemini-flash-latest` model to bring intelligence to the platform. 

- **Refinement**: Instructors can send a rough draft of an assignment, and the AI will return a structured, professional Markdown-formatted description.
- **Feedback**: As soon as a student submits their work, the AI analyzes their submission note against the assignment requirements to provide encouraging, actionable advice before the instructor even sees it.


