const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Result = require('../models/Result');

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId, isPublished: true });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const questions = await Question.find({ quizId: quiz._id }).select('-correctAnswer -explanation').sort('order');
    res.json({ quiz, questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    await Question.deleteMany({ quizId: req.params.id });
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    const questions = await Question.find({ quizId: quiz._id });

    let score = 0;
    let totalMarks = 0;
    const resultAnswers = [];

    questions.forEach(q => {
      totalMarks += q.marks;
      const userAnswer = answers.find(a => a.questionId === q._id.toString());
      const isCorrect = userAnswer && userAnswer.selectedAnswer === q.correctAnswer;
      
      if (isCorrect) score += q.marks;
      
      resultAnswers.push({
        questionId: q._id,
        selectedAnswer: userAnswer?.selectedAnswer,
        isCorrect
      });
    });

    const percentage = (score / totalMarks) * 100;
    const passed = percentage >= quiz.passingScore;

    const result = await Result.create({
      userId: req.user._id,
      quizId: quiz._id,
      answers: resultAnswers,
      score,
      totalMarks,
      percentage,
      passed,
      timeTaken
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .populate('quizId')
      .sort('-attemptedAt');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate('quizId');
    if (!result || result.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Result not found' });
    }
    const questions = await Question.find({ quizId: result.quizId._id });
    res.json({ result, questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
