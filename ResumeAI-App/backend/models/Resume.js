const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Object, required: true }, // FULL resume JSON
  origin: { type: String, enum: ['upload', 'linkedin', 'ai'], required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
