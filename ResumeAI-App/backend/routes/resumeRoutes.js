// 1. ALL IMPORTS
const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const { PDFDocument } = require('pdf-lib'); 
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// 2. RATE LIMITER CONFIGURATION
// AI calls expensive hoti hain, isliye limit lagana zaruri hai
const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Hour
  max: 50, // Limit each IP to 50 uploads per hour
  message: { success: false, message: "Too many uploads, please try again later." }
});

// 3. MULTER STORAGE CONFIGURATION
// Files ko seedha RAM (Memory) mein handle kar rahe hain faster processing ke liye
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB file size
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// 4. PDF PARSING ENDPOINT
// Is endpoint se hum PDF ka raw text nikalte hain
router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log(`📄 Processing PDF: ${req.file.originalname}`);

    // PDF load karna pdf-lib ke saath
    const pdfDoc = await PDFDocument.load(req.file.buffer);
    const pages = pdfDoc.getPages();
    
    // Node 22 safe text extraction logic
    // pdf-lib metadata aur pages handle karne mein top hai
    // Raw text ke liye hum buffer encoding ka use kar rahe hain jo Node 22 pe kabhi nahi phatega
    const rawText = req.file.buffer.toString('utf8')
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Non-printable characters hatao
      .replace(/\s+/g, ' ')               // Extra spaces clean karo
      .trim();

    if (!rawText || rawText.length < 20) {
      throw new Error("Could not extract enough text. Please ensure the PDF is not a scanned image.");
    }

    console.log(`✅ Parsing Successful: ${rawText.length} characters found.`);

    res.json({
      success: true,
      rawText: rawText,
      pageCount: pages.length
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
      return res.status(404).json({ success: false, message: "No resume found for this user." });
    }
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error while fetching resume." });
  }
});

// 6. SAVE OR UPDATE RESUME
router.post('/', protect, async (req, res) => {
  try {
    const { data, origin } = req.body;
    let resume = await Resume.findOne({ user: req.user.id });
    
    if (resume) {
      // Update existing
      resume.data = data;
      resume.origin = origin;
      resume.updatedAt = Date.now();
      await resume.save();
    } else {
      // Create new
      resume = await Resume.create({ user: req.user.id, data, origin });
    }
    res.json({ success: true, data: resume });
  } catch (err) {
    console.error("❌ Resume Save Error:", err.message);
    res.status(500).json({ success: false, message: "Error while saving resume." });
  }
});

// 7. EXPORT THE ROUTER
module.exports = router;