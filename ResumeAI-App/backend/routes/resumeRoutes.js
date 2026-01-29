const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); 
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// 1. Cleaning Function (Directly from your ATSChecker logic)
const cleanAIResponse = (text) => {
  if (!text) return null;
  // Remove markdown backticks
  let cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    const startIndex = cleanedText.indexOf('{');
    const endIndex = cleanedText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      return JSON.parse(cleanedText.substring(startIndex, endIndex + 1));
    }
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error("❌ JSON Clean Error:", err.message);
    return null;
  }
};

const upload = multer({ storage: multer.memoryStorage() });

router.post('/parse', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file' });

    // PDF Parsing
    const data = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true, disableFontFace: true });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map(item => item.str).join(" ") + "\n";
    }
    const cleanText = fullText.replace(/\s+/g, ' ').trim();

    console.log(`🧠 Sending to Grok AI with ATS-style cleaning...`);

    // Grok AI Call
    const grokResponse = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "Return ONLY a valid JSON object. Keys: full_name, email, phone, job_title, summary, experience (array), skills (array)."
          },
          { role: "user", content: `Extract from: ${cleanText}` }
        ],
        temperature: 0.1 // ATS Checker ki tarah low temperature for accuracy
      },
      {
        headers: { 'Authorization': `Bearer ${process.env.GROK_API_KEY}`, 'Content-Type': 'application/json' }
      }
    );

    // 🔥 ATS CHECKER LOGIC APPLIED HERE
    const rawContent = grokResponse.data.choices[0].message.content;
    const finalJson = cleanAIResponse(rawContent);

    if (!finalJson) {
      throw new Error("AI response cleaning failed.");
    }

    res.json({ success: true, data: finalJson });

  } catch (err) {
    console.error('❌ Final Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;