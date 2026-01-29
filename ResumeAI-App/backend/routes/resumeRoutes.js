const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); 
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const parseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 50, 
  message: { success: false, message: "Too many uploads, please try again later." }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

router.post('/parse', parseLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    console.log(`📄 Parsing PDF: ${req.file.originalname}`);

    const data = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ 
      data,
      useSystemFonts: true,
      disableFontFace: true 
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }

    const cleanText = fullText.replace(/\s+/g, ' ').trim();

    if (cleanText.length < 20) throw new Error("Extracted text is too short.");

    console.log(`🧠 Sending to Grok AI for structuring...`);
    
    const grokResponse = await axios.post(
      '[https://api.x.ai/v1/chat/completions](https://api.x.ai/v1/chat/completions)',
      {
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "Extract resume data and return ONLY a valid JSON object. Do not include markdown formatting or backticks. Keys: full_name, email, phone, job_title, summary, experience (array of objects), education (array), skills (array)."
          },
          {
            role: "user",
            content: `Extracted Text: ${cleanText}`
          }
        ],
        temperature: 0
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let content = grokResponse.data.choices[0].message.content;
    
    // 🔥 Remove potential markdown kachra (backticks)
    const cleanJsonString = content.replace(/```json/g, "").replace(/```/g, "").trim();
    const finalJson = JSON.parse(cleanJsonString);

    res.json({ success: true, data: finalJson });

  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { data, origin } = req.body;
    let resume = await Resume.findOneAndUpdate(
      { user: req.user.id },
      { data, origin, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

module.exports = router;