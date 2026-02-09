const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    const existing = await Enrollment.findOne({ userId: req.user._id, courseId });
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    const enrollment = await Enrollment.create({ userId: req.user._id, courseId });
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });
    
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id })
      .populate('courseId')
      .sort('-enrolledAt');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const enrollment = await Enrollment.findOne({ 
      userId: req.user._id, 
      courseId: req.params.courseId 
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      enrollment.lastAccessedAt = Date.now();
      await enrollment.save();
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: req.params.courseId
    }).populate('courseId');
    
    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled' });
    }
    
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
