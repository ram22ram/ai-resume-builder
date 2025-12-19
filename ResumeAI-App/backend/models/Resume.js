const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User model se link kiya
    required: true
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    linkedin: String,
    portfolio: String,
    jobTitle: String,
    summary: String,
    photoUrl: String // Cloudinary URL yahan aayega
  },
  experience: [{
    id: String,
    jobTitle: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String // Bullet points text
  }],
  education: [{
    id: String,
    degree: String,
    school: String,
    startDate: String,
    endDate: String,
    grade: String
  }],
  projects: [{
    id: String,
    title: String,
    description: String,
    link: String,
    techStack: String
  }],
  skills: [String], // Simple array of strings
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);