const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: String,
  videoUrl: String,
  duration: Number,
  order: { type: Number, required: true },
  materials: [{
    title: String,
    url: String,
    type: { type: String, enum: ['pdf', 'doc', 'video', 'link'] }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);
