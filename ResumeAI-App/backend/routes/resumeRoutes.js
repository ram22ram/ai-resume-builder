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
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'No file received' });
    }

    const pdfParser = new PDFParser(null, 1);

    pdfParser.on("pdfParser_dataError", errData => {
      console.error("❌ PDF Parser Error:", errData.parserError);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Parsing failed" });
      }
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      const rawText = pdfParser.getRawTextContent();
      // Decode URI format strings jo pdf2json deta hai
      const cleanText = decodeURIComponent(rawText).replace(/\r\n/g, '\n').trim();
      
      console.log("✅ Parsing Successful");
      if (!res.headersSent) {
        res.json({ success: true, rawText: cleanText });
      }
    });

    // Buffer se load karo
    pdfParser.parseBuffer(req.file.buffer);

  } catch (err) {
    console.error('❌ Server Error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: err.message });
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