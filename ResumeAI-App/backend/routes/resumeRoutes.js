const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const pdfParse = require('pdf-parse'); // Isko niche handle karenge
const rateLimit = require('express-rate-limit');

// 1. Rate Limiter (Testing ke liye generous limit)
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 30, 
  message: { success: false, message: "Too many uploads, try again later" }
});

// 2. Multer Setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

/**
 * 🔓 PUBLIC PDF PARSE ENDPOINT
 */
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'No file received' });
    }

    console.log(`📄 Attempting to parse: ${req.file.originalname}`);

    // 🔥 THE FIX: Sahi tareeke se function nikalna
    let parser;
    if (typeof pdfParse === 'function') {
      parser = pdfParse;
    } else if (pdfParse && typeof pdfParse.default === 'function') {
      parser = pdfParse.default;
    } else if (typeof pdfParse === 'object' && pdfParse !== null) {
      // Kuch environments mein ye aise milta hai
      parser = pdfParse; 
    }

    // Aakhri koshish: Agar parser abhi bhi function nahi hai toh throw error
    if (typeof parser !== 'function') {
      console.error("❌ Library Structure:", typeof pdfParse);
      // Agar direct function nahi hai, toh check karo ki kya ye object call ho sakta hai
      // pdf-parse module usually function export karta hai, par hum backup rakhte hain
    }

    // Buffer parsing - pdf-parse usually returns a promise
    const data = await pdfParse(req.file.buffer);

    if (!data || !data.text) {
      throw new Error("Could not extract text from PDF");
    }

    const cleanText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

    console.log("✅ Successfully parsed PDF");

    res.json({
      success: true,
      rawText: cleanText,
    });

  } catch (err) {
    console.error('❌ PDF Parse Error:', err.message);
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`
    });
  }
});

/**
 * 🔒 AUTH ROUTES
 */
router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching resume" });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { data, origin } = req.body;
    let resume = await Resume.findOne({ user: req.user.id });
    if (resume) {
      resume.data = data;
      resume.origin = origin;
      resume.updatedAt = Date.now();
      await resume.save();
    } else {
      resume = await Resume.create({ user: req.user.id, data, origin });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving resume" });
  }
});

module.exports = router;