const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get current user's resume
// @route   GET /api/resume
// @access  Private (Locked)
router.get('/', protect, async (req, res) => {
  try {
    // Sirf ussi user ka resume dhundo jo logged in hai
    const resume = await Resume.findOne({ user: req.user.userId });
    
    if (resume) {
      res.json({ success: true, data: resume });
    } else {
      res.json({ success: false, message: "No resume found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Save or Update Resume
// @route   POST /api/resume
// @access  Private (Locked)
router.post('/', protect, async (req, res) => {
  const { personalInfo, experience, education, projects, skills } = req.body;

  try {
    // Check karo pehle se resume hai kya?
    let resume = await Resume.findOne({ user: req.user.userId });

    if (resume) {
      // Update existing
      resume.personalInfo = personalInfo;
      resume.experience = experience;
      resume.education = education;
      resume.projects = projects;
      resume.skills = skills;
      resume.lastUpdated = Date.now();
      
      await resume.save();
      return res.json({ success: true, data: resume, message: "Resume Updated" });
    }

    // Create new
    resume = new Resume({
      user: req.user.userId,
      personalInfo,
      experience,
      education,
      projects,
      skills
    });

    await resume.save();
    res.status(201).json({ success: true, data: resume, message: "Resume Created" });

  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Server Error saving resume" });
  }
});

module.exports = router;