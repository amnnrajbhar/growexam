const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  getResults,
  getResult
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/auth');

router.get('/course/:courseId', protect, getQuizzes);
router.get('/results', protect, getResults);
router.get('/results/:id', protect, getResult);
router.get('/:id', protect, getQuiz);
router.post('/', protect, authorize('admin'), createQuiz);
router.put('/:id', protect, authorize('admin'), updateQuiz);
router.delete('/:id', protect, authorize('admin'), deleteQuiz);
router.post('/:id/submit', protect, submitQuiz);

module.exports = router;
