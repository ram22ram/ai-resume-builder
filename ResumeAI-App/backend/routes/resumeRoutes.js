const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const PDFParser = require("pdf2json"); 
const rateLimit = require('express-rate-limit');

// 1. Rate Limiter
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { success: false, message: "Too many uploads, try again later" }
});

// 2. Multer Setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

/**
 * 🔓 PUBLIC PDF PARSE ENDPOINT
 */
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ success: false, message: 'No file received' });
  }

  // Promise base approach taaki Node.js wait kare
  const pdfParser = new PDFParser(null, 1);

  const parsePDF = () => {
    return new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", () => {
        const rawText = pdfParser.getRawTextContent();
        resolve(decodeURIComponent(rawText));
      });
      pdfParser.parseBuffer(req.file.buffer);
    });
  };

  try {
    console.log(`📄 Parsing: ${req.file.originalname}`);
    const cleanText = await parsePDF();
    
    res.json({
      success: true,
      rawText: cleanText.replace(/\r\n/g, '\n').trim(),
    });
  } catch (err) {
    console.error('❌ Parsing Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Failed to parse PDF content" });
    }
  }
});

/**
 * 🔒 USER ROUTES
 */
router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching" });
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
    res.status(500).json({ success: false, message: "Error saving" });
  }
});

module.exports = router;