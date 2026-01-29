// 1. ALL IMPORTS
const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
// FIXED: Node environment ke liye sirf legacy build hi chalega
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); 
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// 2. RATE LIMITER CONFIGURATION
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, 
  message: { success: false, message: "Too many uploads, please try again later." }
});

// 3. MULTER STORAGE CONFIGURATION
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// 4. PDF PARSING ENDPOINT (Fixed for Node 22 Stability)
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log(`📄 Parsing PDF with Legacy Engine: ${req.file.originalname}`);

    // Uint8Array format mein data convert karna
    const data = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ 
      data,
      useSystemFonts: true,
      disableFontFace: true // Server side stability ke liye zaroori
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";

    // Har page se text extract karne ka loop
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Binary kachre ko asli string mein convert karna
      const pageText = textContent.items
        .map(item => item.str)
        .join(" ");
        
      fullText += pageText + "\n";
    }

    // Clean up extra whitespace aur binary headers hatana
    const cleanText = fullText
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText || cleanText.length < 20) {
      throw new Error("Extracted text is too short. PDF might be a scanned image.");
    }

    console.log(`✅ Success: Extracted ${cleanText.length} actual text characters.`);

    res.json({
      success: true,
      rawText: cleanText,
      pageCount: pdf.numPages
    });

  } catch (err) {
    console.error('❌ PDF Parse Error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: "Parsing failed: " + err.message 
    });
  }
});

// 5. FETCH SAVED RESUME
router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    if (!resume) {
      return res.status(404).json({ success: false, message: "No resume found" });
    }
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching resume" });
  }
});

// 6. SAVE OR UPDATE RESUME
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
    console.error("❌ Resume Save Error:", err.message);
    res.status(500).json({ success: false, message: "Error while saving resume." });
  }
});

module.exports = router;