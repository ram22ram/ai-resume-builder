const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const pdfParse = require('pdf-parse'); // Standard import
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
    if (!req.file) return res.status(400).json({ success: false, message: 'No file' });

    console.log(`📄 Parsing PDF: ${req.file.originalname}`);

    // Node 22 compatibility: Standard require fail hone par internal lib uthao
    let parseFunc;
    try {
        // Step 1: Check standard export
        if (typeof pdfParse === 'function') {
            parseFunc = pdfParse;
        } else if (pdfParse && typeof pdfParse.default === 'function') {
            parseFunc = pdfParse.default;
        } else {
            // Step 2: Force load the actual file path (Sabse bada fix)
            parseFunc = require('pdf-parse/lib/pdf-parse.js');
        }
    } catch (e) {
        console.error("🚨 Import fail, trying fallback...");
        parseFunc = require('pdf-parse/lib/pdf-parse.js');
    }

    // Ab parseFunc 100% function hoga
    const data = await parseFunc(req.file.buffer);
    
    const cleanText = data.text.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();
    console.log(`✅ Success: Parsed ${cleanText.length} chars`);

    res.json({ success: true, rawText: cleanText, pageCount: data.numpages || 1 });

  } catch (err) {
    console.error('❌ PDF Parse Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
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