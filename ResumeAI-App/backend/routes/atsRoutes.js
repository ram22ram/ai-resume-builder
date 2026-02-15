const express = require('express');
const multer = require('multer');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// simple keyword extractor
const extractKeywords = (text = '') => {
    return Array.from(
        new Set(
            text
                .toLowerCase()
                .replace(/[^a-z0-9 ]/g, ' ')
                .split(/\s+/)
                .filter(w => w.length > 3)
        )
    );
};

const requireAuth = require('../middleware/requireAuth');

router.post('/check', requireAuth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No resume uploaded' });
        }

        // 1️⃣ Extract PDF text
        const data = new Uint8Array(req.file.buffer);
        const pdf = await pdfjsLib.getDocument({ data }).promise;

        let resumeText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            resumeText += content.items.map(i => i.str).join(' ') + ' ';
        }

        resumeText = resumeText.replace(/\s+/g, ' ').trim();
        const jdText = req.body.jd || '';

        // 2️⃣ Keywords
        const resumeKeywords = extractKeywords(resumeText);
        const jdKeywords = extractKeywords(jdText);

        const matched = jdKeywords.filter(k => resumeKeywords.includes(k));
        const missing = jdKeywords.filter(k => !resumeKeywords.includes(k));

        // 3️⃣ Scores
        const keywordScore = jdKeywords.length
            ? Math.round((matched.length / jdKeywords.length) * 100)
            : 70;

        const lengthScore =
            resumeText.length > 1500 && resumeText.length < 5000 ? 85 : 60;

        const formattingScore = resumeText.includes('•') || resumeText.includes('-')
            ? 80
            : 65;

        const total = Math.round(
            keywordScore * 0.5 +
            lengthScore * 0.25 +
            formattingScore * 0.25
        );

        res.json({
            success: true,
            total,
            breakdown: {
                keywords: keywordScore,
                length: lengthScore,
                formatting: formattingScore,
            },
            missingKeywords: missing.slice(0, 20),
            resumeText,
        });

    } catch (err) {
        console.error('ATS ERROR:', err);
        res.status(500).json({ success: false, message: 'ATS check failed' });
    }
});

module.exports = router;
