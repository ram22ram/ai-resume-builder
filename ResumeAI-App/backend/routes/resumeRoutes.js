const express = require('express');
const multer = require('multer');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const router = express.Router();
const Resume = require('../models/Resume');
const requireAuth = require('../middleware/requireAuth');

const cleanAIResponse = (text) => {
  if (!text) return null;
  let cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    const startIndex = cleanedText.indexOf('{');
    const endIndex = cleanedText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      return JSON.parse(cleanedText.substring(startIndex, endIndex + 1));
    }
    return JSON.parse(cleanedText);
  } catch (err) { return null; }
};

const upload = multer({ storage: multer.memoryStorage() });

/* ======================================================
   SAVE — Upsert the active resume for authenticated user
   POST /api/resume/save
   Body: { resumeData: ResumeData }
   ====================================================== */
router.post('/save', requireAuth, async (req, res) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) {
      return res.status(400).json({ success: false, message: 'resumeData is required' });
    }

    // Upsert: one active resume per user (most recent wins)
    const resume = await Resume.findOneAndUpdate(
      { user: req.user._id || req.user.id },
      {
        data: resumeData,
        origin: 'manual',
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, resumeId: resume._id });
  } catch (err) {
    console.error('Resume save error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to save resume' });
  }
});

/* ======================================================
   LOAD — Fetch the most recent resume for authenticated user
   GET /api/resume/load
   ====================================================== */
router.get('/load', requireAuth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id || req.user.id })
      .sort({ updatedAt: -1 })
      .lean();

    if (!resume) {
      return res.json({ success: true, data: null }); // No resume yet — not an error
    }

    res.json({ success: true, data: resume.data });
  } catch (err) {
    console.error('Resume load error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to load resume' });
  }
});

/* ======================================================
   PARSE — PDF upload → AI extraction (premium only)
   POST /api/resume/parse
   ====================================================== */
router.post('/parse', requireAuth, upload.single('file'), async (req, res) => {
  let cleanText = "";
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file' });

    // 1. PDF Text Extraction
    const data = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true, disableFontFace: true });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map(item => item.str).join(" ") + "\n";
    }
    cleanText = fullText.replace(/\s+/g, ' ').trim();

    console.log(`🧠 Calling Groq with GROQ_API_KEY...`);

    // 2. Groq AI Call
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Extract name, email, phone, job_title, and summary into a JSON object. Return ONLY JSON." },
          { role: "user", content: `Text: ${cleanText.substring(0, 8000)}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const finalJson = cleanAIResponse(groqResponse.data.choices[0].message.content);
    res.json({ success: true, data: finalJson });

  } catch (err) {
    console.error('⚠️ AI Error/Fallback:', err.message);
    res.json({
      success: true,
      data: {
        summary: cleanText || "Error parsing file. Please fill manually.",
        full_name: "",
        email: "",
        job_title: ""
      },
      message: "AI Busy: Extracted raw text."
    });
  }
});

module.exports = router;