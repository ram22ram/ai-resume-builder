// netlify/functions/generate.js
// netlify/functions/generate.js
export const handler = async (event) => {
  // 1. CORS Headers Setup
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // 2. Handle Preflight Requests (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const parsedBody = JSON.parse(event.body);
    
    // ============================================================
    // PATH 1: LOCAL LAPTOP SERVER (NGROK / OLLAMA)
    // ============================================================
    // Agar frontend se 'ngrokUrl' aya hai, to Google ke paas mat jao,
    // Seedha laptop ke paas jao. (Ye CORS issue solve karega)
    if (parsedBody.ngrokUrl) {
      console.log("🚀 Routing request to Local Ngrok Server:", parsedBody.ngrokUrl);

      try {
        const laptopResponse = await fetch(parsedBody.ngrokUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420' // 👈 Ye header Ngrok ka warning page bypass karega
          },
          body: JSON.stringify({
            model: parsedBody.model || "llama3",
            prompt: parsedBody.prompt,
            stream: false,
            format: "json"
          })
        });

        if (!laptopResponse.ok) {
          throw new Error(`Laptop Server Error: ${laptopResponse.status}`);
        }

        const laptopData = await laptopResponse.json();
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(laptopData)
        };

      } catch (proxyError) {
        console.error("Proxy Error:", proxyError);
        return {
          statusCode: 502, // Bad Gateway
          headers,
          body: JSON.stringify({ error: "Failed to connect to Laptop Server. Is Ngrok running?" })
        };
      }
    }

    // ============================================================
    // PATH 2: GOOGLE GEMINI CLOUD (Existing Logic)
    // ============================================================
    // Agar Ngrok nahi hai, to normal Gemini API call karo (Resume Builder ke liye)
    
    const { section, promptText, resumeText, jobDescription } = parsedBody;

    // 4. Validation Logic
    if (!section) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Section is required' }) };
    }

    if (section !== 'ats_check' && !promptText) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Prompt text is required' }) };
    }

    if (section === 'ats_check' && (!resumeText || !jobDescription)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Resume and JD required' }) };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'API configuration error' }) };
    }

    // 👇 Stable Model Use kar rahe hain
    const model = 'gemini-1.5-flash';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_API_KEY}`;
    
    // 5. Dynamic Prompt Generation
    let prompt = '';

    if (section === 'ats_check') {
      prompt = `
        Act as an expert Applicant Tracking System (ATS) scanner.
        Compare the RESUME CONTENT against the JOB DESCRIPTION (JD).
        
        RESUME CONTENT:
        "${resumeText.substring(0, 8000)}"
        
        JOB DESCRIPTION:
        "${jobDescription.substring(0, 4000)}"
        
        Output strictly in valid JSON format (no markdown) with:
        {
          "score": (number 0-100),
          "match_status": ("High", "Medium", or "Low"),
          "summary": (string),
          "missing_keywords": (array of strings),
          "formatting_issues": (array of strings)
        }
      `;
    } else {
      prompt = section === 'summary' 
        ? `Create a professional resume summary for: ${promptText}. Return only text.`
        : `Enhance this resume ${section}: "${promptText}". Focus on achievements. Return only text.`;
    }

    console.log('Sending request to Gemini...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // JSON Cleanup
    if (section === 'ats_check') {
      generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        content: generatedText,
        section: section
      })
    };

  } catch (error) {
    console.error('Handler Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};