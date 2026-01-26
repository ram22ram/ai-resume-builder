const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const multer = require('multer');
const pdfParse = require('pdf-parse');
const rateLimit = require('express-rate-limit');

// ---------- RATE LIMIT (PUBLIC PARSE) ----------
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 PDFs per hour per IP
});

// ---------- MULTER (MEMORY STORAGE) ----------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files allowed'));
    }
    cb(null, true);
  }
});

/**
 * 🔓 PUBLIC PDF PARSE ENDPOINT
 * No auth, no DB save
 */
router.post(
  '/parse',
  parseLimiter,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const data = await pdfParse(req.file.buffer);

      const cleanText = data.text
        .replace(/\r\n/g, '\n')
        .replace(/\n{2,}/g, '\n\n')
        .trim();

      res.json({
        success: true,
        rawText: cleanText,
      });
    } catch (err) {
      console.error('PDF Parse Error:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to parse PDF',
      });
    }
  }
);

// ---------- EXISTING AUTH ROUTES (UNCHANGED) ----------
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
