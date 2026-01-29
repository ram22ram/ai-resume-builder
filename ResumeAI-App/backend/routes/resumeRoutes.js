const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const pdf = require('pdf-parse'); // pdfjs-dist hata kar ye use karo
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ========== 1. RATE LIMITER ==========
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { success: false, message: "Too many uploads, try again later" }
});

// ========== 2. MULTER SETUP ==========
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// ========== 3. PDF PARSE ENDPOINT ==========
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log(`📄 Parsing PDF with pdf-parse: ${req.file.originalname}`);

    // pdf-parse se text nikalna ekdum asaan hai
    const data = await pdf(req.file.buffer);
    
    // Clean text (extra spaces aur lines hatao)
    const cleanText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`✅ Parsed ${cleanText.length} characters successfully`);

    res.json({
      success: true,
      rawText: cleanText,
      pageCount: data.numpages || 1
    });

  } catch (err) {
    console.error('❌ PDF Parse Error:', err.message);
    res.status(500).json({ success: false, message: "PDF parsing error: " + err.message });
  }
});

// ========== 4. USER RESUME ROUTES ==========
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
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving resume" });
  }
});

module.exports = router;