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
    // 3. Parse Inputs (Added resumeText & jobDescription)
    const { section, promptText, resumeText, jobDescription } = JSON.parse(event.body);
    
    // 4. Validation Logic Update
    if (!section) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Section is required' })
      };
    }

    // Agar ATS check nahi hai, to promptText zaroori hai
    if (section !== 'ats_check' && !promptText) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt text is required for this section' })
      };
    }

    // Agar ATS check hai, to Resume aur JD zaroori hai
    if (section === 'ats_check' && (!resumeText || !jobDescription)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Resume text and Job Description are required for ATS check' })
      };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API configuration error' })
      };
    }

    const model = 'gemini-1.5-flash';
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GOOGLE_API_KEY}`;
    
    // 5. Dynamic Prompt Generation
    let prompt = '';

    if (section === 'ats_check') {
      // ATS Specific Prompt (Strict JSON Output)
      prompt = `
        Act as an expert Applicant Tracking System (ATS) scanner.
        Compare the RESUME CONTENT against the JOB DESCRIPTION (JD).
        
        RESUME CONTENT:
        "${resumeText.substring(0, 5000)}"
        
        JOB DESCRIPTION:
        "${jobDescription.substring(0, 2000)}"
        
        Output strictly in valid JSON format (no markdown, no backticks) with the following structure:
        {
          "score": (number between 0-100),
          "match_status": ("High", "Medium", or "Low"),
          "summary": (string, 1-2 sentence feedback),
          "missing_keywords": (array of strings, top 5 missing hard skills),
          "formatting_issues": (array of strings, list potential parsing issues e.g. "No email found", "Graphics detected")
        }
      `;
    } else {
      // Existing Logic for Summary/Experience
      prompt = section === 'summary' 
        ? `Create a professional 2-3 line resume summary for a ${promptText}. Focus on key strengths, technical skills, and career achievements. Use professional tone and action-oriented language. Return only the summary text without any explanations.`
        : `Enhance this resume ${section} to be more professional and impactful: "${promptText}". Focus on quantifiable achievements, action verbs, and professional language. Keep it concise. Return only the enhanced text without any explanations.`;
    }

    console.log('Sending request to AI Model...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: section === 'ats_check' ? 0.2 : 0.7, // Lower temperature for ATS to ensure valid JSON
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]) {
      throw new Error('Invalid response format from AI API');
    }

    let generatedText = data.candidates[0].content.parts[0].text;
    
    // 6. JSON Cleanup (Very Important for ATS)
    // Agar response ATS ka hai, to markdown code blocks remove karo taaki Frontend JSON.parse kar sake
    if (section === 'ats_check') {
      generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
    }

    console.log('AI generation successful');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        content: generatedText, // Frontend will receive this as 'data.content'
        section: section,
        modelUsed: model
      })
    };

  } catch (error) {
    console.error('Error in generate function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate content',
        message: error.message
      })
    };
  }
};