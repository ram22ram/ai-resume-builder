const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
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
    const allowedTypes = ['application/pdf'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// ========== 3. PDF PARSE ENDPOINT ==========
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    console.log(`📄 Parsing PDF: ${req.file.originalname} (${req.file.size} bytes)`);

    // Server-side के लिए worker disable कर दो
    pdfjsLib.GlobalWorkerOptions.workerSrc = null;

    // PDF parse करो
    const pdfData = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    const pageCount = pdf.numPages;

    // सभी pages से text extract करो
    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Text items combine करो
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      
      fullText += pageText + '\n';
    }

    // Clean text
    const cleanText = fullText
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`✅ Parsed ${cleanText.length} characters from ${pageCount} pages`);

    res.json({
      success: true,
      rawText: cleanText,
      pageCount: pageCount
    });

  } catch (err) {
    console.error('❌ PDF Parse Error:', err.message);

    let errorMsg = "Failed to parse PDF";
    let statusCode = 500;

    if (err.message.includes('file size') || err.message.includes('large')) {
      errorMsg = "File too large. Maximum 3MB allowed.";
      statusCode = 413;
    } else if (err.message.includes('PDF') || err.message.includes('format')) {
      errorMsg = "Invalid PDF file. Please upload a valid PDF.";
      statusCode = 400;
    } else {
      errorMsg = "PDF parsing error: " + err.message;
    }

    res.status(statusCode).json({ 
      success: false, 
      message: errorMsg 
    });
  }
});

// ========== 4. USER RESUME ROUTES ==========
router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json({ success: true, data: resume });
  } catch (err) {
    console.error('Get resume error:', err);
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
      resume = await Resume.create({ 
        user: req.user.id, 
        data, 
        origin 
      });
    }
    
    res.json({ success: true, data: resume });
    
  } catch (err) {
    console.error('Save resume error:', err);
    res.status(500).json({ success: false, message: "Error saving resume" });
  }
});

module.exports = router;