# GrowExam Backend API

Node.js + Express + MongoDB backend for GrowExam learning platform.

## Features

- JWT authentication with role-based access control
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
NODE_ENV=development
FRONTEND_URL=http://localhost:4200
```

3. Seed database:
```bash
npm run seed
```

4. Start server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Courses
- `GET /api/courses` - Get all courses (query: category, search, level)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)
- `GET /api/courses/categories` - Get all categories

### Lessons
- `GET /api/lessons/course/:courseId` - Get course lessons
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons` - Create lesson (admin)
- `PUT /api/lessons/:id` - Update lesson (admin)
- `DELETE /api/lessons/:id` - Delete lesson (admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/my` - Get my enrollments
- `GET /api/enrollments/:courseId` - Get enrollment details
- `PUT /api/enrollments/:courseId/progress` - Update progress

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get course quizzes
- `GET /api/quizzes/:id` - Get quiz with questions
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/results` - Get my results
- `GET /api/quizzes/results/:id` - Get result details
- `POST /api/quizzes` - Create quiz (admin)
- `PUT /api/quizzes/:id` - Update quiz (admin)
- `DELETE /api/quizzes/:id` - Delete quiz (admin)

### Questions
- `GET /api/questions/quiz/:quizId` - Get quiz questions (admin)
- `POST /api/questions` - Create question (admin)
- `PUT /api/questions/:id` - Update question (admin)
- `DELETE /api/questions/:id` - Delete question (admin)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/students` - Get all students
- `GET /api/admin/students/:studentId/activity` - Get student activity

## Default Credentials

After seeding:
- Admin: `admin@growexam.com` / `admin123`
- Student: `student@test.com` / `student123`

## Deployment (Render)

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy!

Build Command: `npm install`
Start Command: `npm start`
