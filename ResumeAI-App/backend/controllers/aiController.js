const axios = require('axios');

exports.generateContent = async (req, res) => {
    try {
        const { prompt, systemRole } = req.body;

        if (!process.env.VITE_GROQ_API_KEY && !process.env.GROQ_API_KEY) {
            return res.status(500).json({ error: 'Server missing GROQ_API_KEY' });
        }

        const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemRole || "You are a helpful career assistant." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1024
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const content = response.data.choices?.[0]?.message?.content || "No response generated.";
        res.json({ content });

    } catch (error) {
        console.error("AI Generation Error:", error.response?.data || error.message);
        res.status(500).json({ error: "AI Generation Failed" });
    }
};

exports.chat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!process.env.VITE_GROQ_API_KEY && !process.env.GROQ_API_KEY) {
            return res.status(500).json({ error: 'Server missing GROQ_API_KEY' });
        }

        const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: messages,
                response_format: { type: "json_object" }
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const content = response.data.choices?.[0]?.message?.content || "{}";
        // Ensure we return valid JSON
        try {
            const jsonContent = JSON.parse(content);
            res.json(jsonContent);
        } catch (e) {
            res.json({ error: "Failed to parse AI response as JSON", raw: content });
        }

    } catch (error) {
        console.error("AI Chat Error:", error.response?.data || error.message);
        res.status(500).json({ error: "AI Chat Failed" });
    }
};
