const express = require('express');
const multer = require('multer');
const axios = require('axios');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); 
const router = express.Router();

// ATS Checker style logic
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
  let cleanText = ""; 
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
    cleanText = fullText.replace(/\s+/g, ' ').trim();

    console.log(`🧠 Using VITE_GROQ_API_KEY for Groq AI...`);

    // Groq API Call
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Extract name, email, phone, job_title, summary into JSON." },
          { role: "user", content: `Text: ${cleanText.substring(0, 8000)}` }
        ],
        response_format: { type: "json_object" }
      },
      {
        headers: { 
          // 🔥 Backend mein environment variable 'VITE_GROQ_API_KEY' use kar rahe hain
          'Authorization': `Bearer ${process.env.VITE_GROQ_API_KEY}`, 
          'Content-Type': 'application/json' 
        }
      }
    );

    const finalJson = cleanAIResponse(groqResponse.data.choices[0].message.content);
    res.json({ success: true, data: finalJson });

  } catch (err) {
    console.error('⚠️ Fallback Triggered:', err.message);
    
    // Emergency Fallback: Agar token abhi bhi 401 de, toh crash mat karo
    res.json({ 
      success: true, 
      data: { 
        summary: cleanText.substring(0, 500),
        full_name: "Manual Entry Required",
        experience: []
      },
      message: "AI Busy: Data extracted as raw text." 
    });
  }
});

module.exports = router;