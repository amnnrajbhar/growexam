const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: String,
  marks: { type: Number, default: 1 },
  order: { type: Number, required: true }
});

module.exports = mongoose.model('Question', questionSchema);
