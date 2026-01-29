const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); // Node 22 ke liye legacy build
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// ========== 3. PDF PARSE ENDPOINT (PDFJS-DIST) ==========
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log(`📄 Parsing PDF: ${req.file.originalname}`);

    // PDF data load karna (Uint8Array format mein)
    const data = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";

    // Har page se text nikalna (Looping through pages)
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }

    // Text clean logic
    const cleanText = fullText
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      throw new Error("Extracted text is empty. PDF might be an image/scanned copy.");
    }

    console.log(`✅ Success: Parsed ${cleanText.length} characters`);

    res.json({
      success: true,
      rawText: cleanText,
      pageCount: pdf.numPages
    });

  } catch (err) {
    console.error('❌ PDF.js Parse Error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: "Parsing failed: " + err.message 
    });
  }
});

// ========== 4. USER RESUME STORAGE ROUTES ==========
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