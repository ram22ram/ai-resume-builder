const express = require('express');
const multer = require('multer');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); 
const Resume = require('../models/Resume');

const router = express.Router();

// ATS Checker Style Cleaning Logic
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
  } catch (err) {
    console.error("❌ Cleaning failed:", err.message);
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

    console.log(`🧠 Sending to Grok AI (x.ai) for Resume Builder...`);

    // 🔥 FIXED GROK API CALL (x.ai Specific)
    const grokResponse = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: "grok-beta", // 🚀 MUST be grok-beta or grok-vision-beta for x.ai
        messages: [
          {
            role: "system",
            content: "You are a resume parser. Return ONLY a valid JSON object. Keys: full_name, email, phone, job_title, summary, experience (array), skills (array)."
          },
          { role: "user", content: `Extract data: ${cleanText.substring(0, 15000)}` }
        ],
        temperature: 0, // No creativity needed for parsing
        stream: false
      },
      {
        headers: { 
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`, // Must be x.ai key
          'Content-Type': 'application/json' 
        }
      }
    );

    const rawContent = grokResponse.data.choices[0].message.content;
    const finalJson = cleanAIResponse(rawContent);

    if (!finalJson) throw new Error("AI returned unparseable content.");

    res.json({ success: true, data: finalJson });

  } catch (err) {
    // Detailed error logging to catch 400 issues
    console.error('❌ Grok API 400/500 Error:', err.response?.data || err.message);
    res.status(500).json({ success: false, message: "AI Error: " + (err.response?.data?.error?.message || err.message) });
  }
});

module.exports = router;