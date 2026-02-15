const express = require('express');
const multer = require('multer');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const router = express.Router();

// ATS Checker style cleaning logic
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

const requirePremium = require('../middleware/requirePremium');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/parse', requirePremium, upload.single('file'), async (req, res) => {
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

    console.log(`🧠 Calling Groq with VITE_GROQ_API_KEY...`);

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
          'Authorization': `Bearer ${process.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const finalJson = cleanAIResponse(groqResponse.data.choices[0].message.content);
    res.json({ success: true, data: finalJson });

  } catch (err) {
    console.error('⚠️ AI Error/Fallback:', err.message);
    // 🔥 Fallback: Agar AI fail ho toh 500 mat bhejo, raw text bhej do
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