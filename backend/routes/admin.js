const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getStudentActivity,
  getAllStudents
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/students', getAllStudents);
router.get('/students/:studentId/activity', getStudentActivity);

module.exports = router;
