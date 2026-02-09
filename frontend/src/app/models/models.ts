export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  enrollmentCount: number;
}

export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  materials?: Material[];
}

export interface Material {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
}

export interface Enrollment {
  _id: string;
  userId: string;
  courseId: Course;
  progress: number;
  completedLessons: string[];
  enrolledAt: Date;
}

export interface Quiz {
  _id: string;
  courseId: string;
  title: string;
  description?: string;
  duration: number;
  passingScore: number;
  type: 'quiz' | 'mock-test';
}

export interface Question {
  _id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
  marks: number;
  order: number;
}

export interface Result {
  _id: string;
  userId: string;
  quizId: Quiz;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeTaken: number;
  attemptedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
}
