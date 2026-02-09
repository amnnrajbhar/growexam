require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB Connected');
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Course.deleteMany();
    await Lesson.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@growexam.com',
      password: 'admin123',
      role: 'admin'
    });

    const student = await User.create({
      name: 'John Doe',
      email: 'student@test.com',
      password: 'student123',
      role: 'student'
    });

    const course1 = await Course.create({
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
      category: 'Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      price: 0,
      duration: '40 hours',
      level: 'beginner',
      instructor: 'Sarah Johnson'
    });

    const course2 = await Course.create({
      title: 'Data Science with Python',
      description: 'Master Python, Pandas, NumPy, Machine Learning',
      category: 'Data Science',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      price: 0,
      duration: '35 hours',
      level: 'intermediate',
      instructor: 'Dr. Michael Chen'
    });

    const course3 = await Course.create({
      title: 'Digital Marketing Masterclass',
      description: 'SEO, Social Media, Email Marketing, Analytics',
      category: 'Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      price: 0,
      duration: '25 hours',
      level: 'beginner',
      instructor: 'Emma Wilson'
    });

    const lesson1 = await Lesson.create({
      courseId: course1._id,
      title: 'Introduction to Web Development',
      description: 'Overview of web technologies',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: 15,
      order: 1,
      materials: [
        { title: 'Course Syllabus', url: 'https://example.com/syllabus.pdf', type: 'pdf' }
      ]
    });

    const lesson2 = await Lesson.create({
      courseId: course1._id,
      title: 'HTML Fundamentals',
      description: 'Learn HTML tags and structure',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: 30,
      order: 2,
      materials: [
        { title: 'HTML Cheatsheet', url: 'https://example.com/html.pdf', type: 'pdf' }
      ]
    });

    const lesson3 = await Lesson.create({
      courseId: course1._id,
      title: 'CSS Styling Basics',
      description: 'Style your web pages with CSS',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: 35,
      order: 3
    });

    const quiz1 = await Quiz.create({
      courseId: course1._id,
      title: 'HTML Basics Quiz',
      description: 'Test your HTML knowledge',
      duration: 15,
      passingScore: 70,
      type: 'quiz'
    });

    await Question.create([
      {
        quizId: quiz1._id,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for Hyper Text Markup Language',
        marks: 1,
        order: 1
      },
      {
        quizId: quiz1._id,
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<h6>', '<h1>', '<heading>', '<head>'],
        correctAnswer: 1,
        explanation: '<h1> is used for the largest heading',
        marks: 1,
        order: 2
      },
      {
        quizId: quiz1._id,
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<br>', '<lb>', '<newline>'],
        correctAnswer: 1,
        explanation: '<br> is the correct tag for line breaks',
        marks: 1,
        order: 3
      }
    ]);

    console.log('Data seeded successfully!');
    console.log('Admin: admin@growexam.com / admin123');
    console.log('Student: student@test.com / student123');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
