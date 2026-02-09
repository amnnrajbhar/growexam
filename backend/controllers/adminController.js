const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Result = require('../models/Result');

exports.getDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const recentEnrollments = await Enrollment.find()
      .populate('userId', 'name email')
      .populate('courseId', 'title')
      .sort('-enrolledAt')
      .limit(10);

    res.json({
      totalStudents,
      totalCourses,
      totalEnrollments,
      recentEnrollments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentActivity = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.params.studentId })
      .populate('courseId');
    const results = await Result.find({ userId: req.params.studentId })
      .populate('quizId');
    
    res.json({ enrollments, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
