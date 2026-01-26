const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const rateLimit = require('express-rate-limit');

// 1. Rate Limiter
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 20, // Limit badha di taaki testing mein block na ho
  message: { success: false, message: "Too many uploads, try again later" }
});

// 2. Multer Setup (Memory Storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB tak limit badha di
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files allowed'), false);
    }
    cb(null, true);
  }
});

/**
 * 🔓 PUBLIC PDF PARSE ENDPOINT
 */
router.post('/parse', parseLimiter, (req, res, next) => {
  // Multer error handling wrapper
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      console.log("❌ No file buffer received");
      return res.status(400).json({ success: false, message: 'File buffer is empty' });
    }

    console.log(`📄 Parsing file: ${req.file.originalname} (${req.file.size} bytes)`);

    // ✅ pdf-parse execution with options for better stability
    const options = {
      pagerender: (pageData) => pageData.getTextContent().then(c => c.items.map(i => i.str).join(' '))
    };

    const data = await pdfParse(req.file.buffer);

    if (!data || !data.text) {
      console.log("❌ PDF Parse resulted in empty text");
      throw new Error("Could not extract text from this PDF");
    }

    const cleanText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

    console.log("✅ PDF Parsed Successfully");
    
    res.json({
      success: true,
      rawText: cleanText,
    });

  } catch (err) {
    console.error('❌ PDF Parse Error Detail:', err.message);
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message || 'Failed to parse PDF'}`
    });
  }
});

// ---------- AUTH ROUTES (UNCHANGED) ----------
router.get('/', protect, async (req, res) => {
  const resume = await Resume.findOne({ user: req.user.id });
  res.json({ success: true, data: resume });
});

router.post('/', protect, async (req, res) => {
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
});

module.exports = router;