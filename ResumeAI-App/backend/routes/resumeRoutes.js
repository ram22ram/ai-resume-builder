const express = require('express');
const multer = require('multer');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); 
const router = express.Router();

// Tera ATS Checker wala cleaning logic
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

router.post('/parse', upload.single('file'), async (req, res) => {
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
    const cleanText = fullText.replace(/\s+/g, ' ').trim();

    // 2. Groq AI Call (Vahi logic jo ATSChecker mein chal raha hai)
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile", // Stable Model
        messages: [
          {
            role: "system",
            content: "Extract resume data into JSON. Keys: full_name, email, phone, job_title, summary, experience, skills."
          },
          { role: "user", content: `Text: ${cleanText.substring(0, 12000)}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1
      },
      {
        headers: { 
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Render pe GROQ_API_KEY daal dena
          'Content-Type': 'application/json' 
        }
      }
    );

    const finalJson = cleanAIResponse(groqResponse.data.choices[0].message.content);
    res.json({ success: true, data: finalJson });

  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ success: false, message: "AI Error: " + err.message });
  }
});

module.exports = router;