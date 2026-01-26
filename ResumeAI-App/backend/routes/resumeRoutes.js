const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const rateLimit = require('express-rate-limit');

// 1. RATE LIMITER
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // Testing ke liye limit thodi aur badha di hai
  message: { success: false, message: "Too many uploads, try again later" }
});

// 2. MULTER SETUP (Memory storage)
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
 * Ismein har tarah ke import structure ko handle kiya gaya hai.
 */
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'No file received' });
    }

    console.log(`📄 Attempting to parse: ${req.file.originalname}`);

    // 🔥 FIX: pdf-parse ko handle karne ke saare patterns
    let parser;
    if (typeof pdfParse === 'function') {
      parser = pdfParse;
    } else if (pdfParse && typeof pdfParse.default === 'function') {
      parser = pdfParse.default;
    } else {
      // Agar module structure complex hai toh direct call try karo
      parser = pdfParse;
    }

    // Double check
    if (typeof parser !== 'function') {
      console.error("Library Load Error Details:", typeof pdfParse);
      throw new Error("pdf-parse library error: parser is not a detectable function");
    }

    // Buffer parsing logic
    const data = await parser(req.file.buffer);

    if (!data || !data.text) {
      throw new Error("Could not extract text from this PDF file");
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
 * 🔒 GET USER RESUME
 */
router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json({ success: true, data: resume });
  } catch (err) {
    console.error("Fetch Error:", err.message);
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
    console.error("Save Error:", err.message);
    res.status(500).json({ success: false, message: "Error saving resume" });
  }
});

module.exports = router;