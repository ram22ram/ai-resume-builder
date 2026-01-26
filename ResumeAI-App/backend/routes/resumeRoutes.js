const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const rateLimit = require('express-rate-limit');

// 1. RATE LIMITER (Abhi testing ke liye 20 uploads allow kiye hain)
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, 
  message: { success: false, message: "Too many uploads, try again later" }
});

// 2. MULTER SETUP (Memory storage for Render)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files allowed'), false);
    }
    cb(null, true);
  }
});

/**
 * 🔓 PUBLIC PDF PARSE ENDPOINT
 * Ismein "pdfParse is not a function" wala fix daal diya hai.
 */
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'No file received' });
    }

    console.log(`📄 Parsing: ${req.file.originalname}`);

    // FIX: pdf-parse import handling
    const parser = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;

    if (typeof parser !== 'function') {
      throw new Error("pdf-parse library error: parser is not a function");
    }

    const data = await parser(req.file.buffer);

    const cleanText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

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
 * 🔒 GET USER RESUME
 */
router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching resume" });
  }
});

/**
 * 🔒 SAVE OR UPDATE RESUME
 */
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