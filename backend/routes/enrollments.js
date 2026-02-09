const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
  getEnrollment
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.post('/', protect, enrollCourse);
router.get('/my', protect, getMyEnrollments);
router.get('/:courseId', protect, getEnrollment);
router.put('/:courseId/progress', protect, updateProgress);

module.exports = router;
