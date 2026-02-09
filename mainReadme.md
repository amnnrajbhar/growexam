//Welcome To Aman's CodeBase
//This is a repository where I will be uploading all my code related to competitive programming and DSA.
# GrowExam Backend API
This is the backend API for the GrowExam online learning platform. It provides endpoints for user authentication, course management, lesson management, enrollment, quizzes, and admin functionalities.
## Features
- User authentication with JWT
- Role-based access control (admin, instructor, student)
- RESTful API design
- MongoDB with Mongoose ODM
- Password hashing with bcrypt
- CORS enabled for frontend integration
## Setup
1. Install dependencies:
```bash
npm install
```
2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
